import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, branch } = body as {
      name: string;
      phone: string;
      branch: string;
    };

    if (!name || !phone || !branch) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Telegram env vars not set");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const text =
      `🏋️ *LandFitness — Yangi So'rov*\n\n` +
      `👤 *Ism:* ${name}\n` +
      `📞 *Telefon:* ${phone}\n` +
      `📍 *Filial:* ${branch}`;

    const tgRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!tgRes.ok) {
      const err = await tgRes.text();
      console.error("Telegram error:", err);
      return NextResponse.json({ error: "Telegram failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
