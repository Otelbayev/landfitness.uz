import Link from "next/link";
import type { Locale } from "@/lib/siteConfig";
import type { Dict } from "@/lib/i18n";
import { branches, social } from "@/lib/siteConfig";

type Props = { locale: Locale; footer: Dict["footer"] };

export default function Footer({ locale, footer }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-10 pt-14 pb-8 sm:pt-16 sm:pb-10">

        {/* ── Top: brand + columns ─────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 mb-12 sm:mb-14">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-px mb-4">
              <span className="text-2xl font-black" style={{ color: "var(--fg)" }}>Land</span>
              <span className="text-2xl font-black gold-text">Fitness</span>
            </div>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--fg-muted)" }}
            >
              {locale === "uz"
                ? "Toshkentdagi premium fitnes markaz — 24/7 ochiq, 2 ta filial."
                : "Премиальный фитнес-клуб в Ташкенте — открыто 24/7, 2 филиала."}
            </p>

            {/* Instagram */}
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 hover:border-gold hover:text-gold"
              style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              {social.instagramHandle}
            </a>
          </div>

          {/* Branch columns */}
          {branches.map(b => (
            <div key={b.id}>
              <Link
                href={`/${locale}/branches/${b.id}`}
                className="text-sm font-bold mb-4 block transition-colors hover:text-gold"
                style={{ color: "var(--fg)" }}
              >
                {locale === "uz" ? b.nameUz : b.nameRu}
              </Link>
              <div className="flex flex-col gap-2">
                {b.phones.map(p => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="text-sm transition-colors hover:text-gold"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {p}
                  </a>
                ))}
                <a
                  href={b.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs mt-1 transition-colors hover:text-gold"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {locale === "uz" ? "Xaritada ko'rish ↗" : "На карте ↗"}
                </a>
              </div>
            </div>
          ))}

          {/* Nav links */}
          <div>
            <p
              className="text-sm font-bold mb-4"
              style={{ color: "var(--fg)" }}
            >
              {locale === "uz" ? "Sahifalar" : "Разделы"}
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { href: "#branches",          uz: "Filiallar",   ru: "Филиалы",  page: false },
                { href: "#pricing",           uz: "Narxlar",     ru: "Цены",     page: false },
                { href: `/${locale}/coaches`, uz: "Murabbiylar", ru: "Тренеры",  page: true  },
                { href: `/${locale}/contact`, uz: "Aloqa",       ru: "Контакты", page: true  },
              ].map(l =>
                l.page ? (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-sm transition-colors hover:text-gold"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {locale === "uz" ? l.uz : l.ru}
                  </Link>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    className="text-sm transition-colors hover:text-gold"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {locale === "uz" ? l.uz : l.ru}
                  </a>
                )
              )}
              <Link
                href={locale === "uz" ? "/ru" : "/uz"}
                className="text-sm transition-colors hover:text-gold mt-0.5"
                style={{ color: "var(--fg-muted)" }}
              >
                {locale === "uz" ? "Русский →" : "O'zbek →"}
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────── */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
        >
          <span>© {year} LandFitness. {footer.rights}.</span>
          <span className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--gold)", boxShadow: "0 0 6px var(--gold)", opacity: 0.8 }}
            />
            {locale === "uz" ? "24 soat, 7 kun ochiq" : "Открыто 24 часа, 7 дней"}
          </span>
        </div>
      </div>
    </footer>
  );
}
