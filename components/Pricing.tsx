"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/siteConfig";
import type { Dict } from "@/lib/i18n";
import type { pricing as PT } from "@/lib/siteConfig";

type Props = { locale: Locale; data: typeof PT; tr: Dict["pricing"] };

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}

function PlanRow({
  label,
  price,
  currency,
  highlight,
}: {
  label: string;
  price: number;
  currency: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between py-3 px-4 rounded-xl transition-colors"
      style={{
        background: highlight ? "var(--gold-dim)" : "transparent",
      }}
      onMouseEnter={e => {
        if (!highlight) (e.currentTarget as HTMLElement).style.background = "var(--gold-dim)";
      }}
      onMouseLeave={e => {
        if (!highlight) (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      <div className="flex items-center gap-2">
        {highlight && (
          <span
            className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: "var(--gold)", color: "#000" }}
          >
            TOP
          </span>
        )}
        <span className="text-sm" style={{ color: "var(--fg-2)" }}>
          {label}
        </span>
      </div>
      <span
        className="text-sm font-bold tabular-nums whitespace-nowrap ml-4"
        style={{ color: highlight ? "var(--gold)" : "var(--gold)" }}
      >
        {fmt(price)}{" "}
        <span className="font-normal text-xs" style={{ color: "var(--fg-muted)" }}>
          {currency}
        </span>
      </span>
    </div>
  );
}

function Block({
  title,
  sub,
  plans,
  locale,
  currency,
  popularIndex,
}: {
  title: string;
  sub: string;
  plans: { labelUz: string; labelRu: string; price: number }[];
  locale: Locale;
  currency: string;
  popularIndex?: number;
}) {
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="px-5 py-4 border-b"
        style={{ background: "var(--gold-dim)", borderColor: "var(--border)" }}
      >
        <p
          className="text-xs font-black uppercase tracking-wider"
          style={{ color: "var(--gold)" }}
        >
          {title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--fg-muted)" }}>
          {sub}
        </p>
      </div>
      <div className="py-1">
        {plans.map((p, i) => (
          <PlanRow
            key={i}
            label={locale === "uz" ? p.labelUz : p.labelRu}
            price={p.price}
            currency={currency}
            highlight={i === popularIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default function Pricing({ locale, data, tr }: Props) {
  const [gender, setGender] = useState<"men" | "women">("men");
  const cur = data[gender];

  return (
    <section
      id="pricing"
      className="section-pad px-5 sm:px-10"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-2xl mx-auto">

        {/* ── Heading ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-10"
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "var(--gold)" }}
          >
            — {tr.title}
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight"
            style={{ color: "var(--fg)" }}
          >
            {tr.titleAccent}
          </h2>
        </motion.div>

        {/* ── Gender tabs ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mb-8"
        >
          <div
            className="inline-flex rounded-2xl p-1 border"
            style={{ borderColor: "var(--border)", background: "var(--bg-2)" }}
          >
            {(["men", "women"] as const).map(g => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className="relative px-7 sm:px-9 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{ color: gender === g ? "#000" : "var(--fg-muted)" }}
              >
                {gender === g && (
                  <motion.span
                    layoutId="gender-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark))",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {g === "men" ? `♂ ${tr.men}` : `♀ ${tr.women}`}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={gender}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease }}
            className="space-y-4"
          >
            {/* Single-visit highlight */}
            <div
              className="flex items-center justify-between px-5 py-4 rounded-2xl border-2"
              style={{ borderColor: "var(--gold)", background: "var(--gold-dim)" }}
            >
              <span className="font-bold" style={{ color: "var(--fg)" }}>
                {tr.singleVisit}
              </span>
              <span
                className="text-xl font-black tabular-nums"
                style={{ color: "var(--gold)" }}
              >
                {fmt(cur.singleVisit)}{" "}
                <span
                  className="text-sm font-normal"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {tr.uzs}
                </span>
              </span>
            </div>

            {/* Night / Day plans — highlight index 1 (Bezlimit / month) as popular */}
            <Block
              title={tr.nightDay}
              sub={tr.nightDayTime}
              plans={cur.nightDay.plans}
              locale={locale}
              currency={tr.uzs}
              popularIndex={1}
            />

            {/* Unlimited plans — highlight index 1 as popular */}
            <Block
              title={tr.unlimited}
              sub={tr.unlimitedTime}
              plans={cur.unlimited.plans}
              locale={locale}
              currency={tr.uzs}
              popularIndex={1}
            />

            {/* Additional services */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="px-5 py-4 border-b"
                style={{ background: "var(--gold-dim)", borderColor: "var(--border)" }}
              >
                <p
                  className="text-xs font-black uppercase tracking-wider"
                  style={{ color: "var(--gold)" }}
                >
                  {tr.additionalServices}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--fg-muted)" }}>
                  {tr.trainerIndividual}
                </p>
              </div>
              <div className="py-1">
                <PlanRow
                  label={`— ${tr.sergeli}`}
                  price={cur.trainer.sergeli}
                  currency={`${tr.uzs} / ${tr.perMonthBlock}`}
                />
                <PlanRow
                  label={`— ${tr.chilonzor}`}
                  price={cur.trainer.chilonzor}
                  currency={`${tr.uzs} / ${tr.perMonthBlock}`}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
