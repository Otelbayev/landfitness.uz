"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

type Props = { tr: Dict["whyUs"] };

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ICONS = [
  <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 5v14M18 5v14M6 8h12M6 16h12M3 8h3M3 16h3M18 8h3M18 16h3"/>
  </svg>,
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>,
  <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>,
  <svg key="5" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>,
];

const NUMS = ["01", "02", "03", "04", "05", "06"];

export default function WhyUs({ tr }: Props) {
  return (
    <section className="section-pad px-5 sm:px-10" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">

        {/* ── Heading ───────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
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

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="text-sm leading-relaxed max-w-xs sm:text-right"
            style={{ color: "var(--fg-muted)" }}
          >
            {tr.subtitle}
          </motion.p>
        </div>

        {/* ── Cards grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tr.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease }}
              className="group relative overflow-hidden rounded-2xl border p-7 transition-all duration-300"
              style={{
                background:   "var(--bg-card)",
                borderColor:  "var(--border)",
                boxShadow:    "var(--shadow)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow), var(--glow)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow)";
              }}
            >
              {/* Ghost number background */}
              <span
                className="absolute -right-2 -top-3 font-black leading-none select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  fontSize:   "6rem",
                  color:      "var(--gold)",
                  opacity:    0.05,
                  fontFamily: "var(--font-display, system-ui)",
                }}
              >
                {NUMS[i]}
              </span>

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "var(--gold-dim)", color: "var(--gold)" }}
              >
                {ICONS[i]}
              </div>

              {/* Number chip */}
              <span
                className="text-[10px] font-black uppercase tracking-widest mb-3 block"
                style={{ color: "var(--gold)", opacity: 0.6 }}
              >
                {NUMS[i]}
              </span>

              <h3
                className="text-base font-bold mb-2 leading-snug"
                style={{ color: "var(--fg)" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--fg-muted)" }}
              >
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
