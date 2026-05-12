"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/siteConfig";
import type { Dict } from "@/lib/i18n";

type Props = { locale: Locale; hero: Dict["hero"] };

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATS = (locale: Locale) => [
  { n: "2",    l: locale === "uz" ? "Filial"   : "Филиала"    },
  { n: "24/7", l: locale === "uz" ? "Ochiq"    : "Открыто"    },
  { n: "500+", l: locale === "uz" ? "A'zo"     : "Участников" },
  { n: "5+",   l: locale === "uz" ? "Murabbiy" : "Тренеров"   },
];

export default function Hero({ locale, hero }: Props) {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">

      {/* ── Background ─────────────────────────────────────── */}
      <div className="absolute inset-0">
        <img
          src="/images/filial1/bg.png"
          alt="LandFitness"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.22) 72%, rgba(0,0,0,0.10) 100%)",
          }}
        />
        {/* Gold radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 15% 85%, rgba(201,162,39,0.22) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* ── Main content ───────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 pb-20 sm:pb-28 pt-32">
        <div className="grid lg:grid-cols-[1fr_260px] gap-10 items-end">

          {/* Left column */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              className="mb-7"
            >
              <span
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
                style={{
                  borderColor: "rgba(201,162,39,0.5)",
                  color:       "var(--gold)",
                  background:  "rgba(201,162,39,0.08)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "var(--gold)",
                    boxShadow:  "0 0 6px var(--gold)",
                    animation:  "pulse 2s ease-in-out infinite",
                  }}
                />
                Premium Fitness Club · Toshkent
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 54 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.08, ease }}
            >
              <h1
                className="font-black text-white leading-[0.86] tracking-[-0.03em]"
                style={{ fontSize: "clamp(3.8rem, 13vw, 9.5rem)" }}
              >
                Land
                <br />
                <span className="gold-text">Fitness</span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease }}
              className="text-base sm:text-xl font-light text-white/55 max-w-md mt-5 mb-10 leading-relaxed"
            >
              {hero.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36, ease }}
              className="flex flex-wrap gap-3 mb-16"
            >
              <a
                href="#contact"
                className="px-8 py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark))",
                  color:      "#000",
                  boxShadow:  "0 0 44px rgba(201,162,39,0.40), 0 2px 12px rgba(0,0,0,0.3)",
                }}
              >
                {hero.cta}
              </a>
              <a
                href="#branches"
                className="px-8 py-4 rounded-2xl font-bold text-sm tracking-wide border text-white/75 transition-all duration-200 hover:border-white/50 hover:text-white hover:bg-white/8"
                style={{ borderColor: "rgba(255,255,255,0.20)" }}
              >
                {locale === "uz" ? "Filiallar" : "Филиалы"}&nbsp;→
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.52 }}
              className="flex flex-wrap gap-8 sm:gap-12 pt-7 border-t border-white/10"
            >
              {STATS(locale).map(s => (
                <div key={s.n} className="flex flex-col gap-1">
                  <span
                    className="font-black gold-text leading-none"
                    style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
                  >
                    {s.n}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-white/40">
                    {s.l}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — floating info cards (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.5, ease }}
            className="hidden lg:flex flex-col gap-3"
          >
            {[
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
                label: locale === "uz" ? "Ish vaqti" : "Часы работы",
                value: "24 / 7",
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                ),
                label: "Chilonzor",
                value: "+998 71 276 60 72",
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                ),
                label: "Sergeli",
                value: "+998 77 144 00 17",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.1, ease }}
                className="px-5 py-4 rounded-2xl border flex items-start gap-3"
                style={{
                  background:     "rgba(0,0,0,0.50)",
                  backdropFilter: "blur(18px) saturate(1.5)",
                  borderColor:    "rgba(255,255,255,0.09)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "var(--gold-dim)", color: "var(--gold)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#branches"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/55 transition-colors"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">{hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </motion.a>
    </section>
  );
}
