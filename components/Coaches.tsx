"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/siteConfig";
import type { Dict } from "@/lib/i18n";
import { coaches as CoachType } from "@/lib/siteConfig";

type Coach = typeof CoachType[number];
type Props  = { locale: Locale; data: Coach[]; tr: Dict["coaches"]; compact?: boolean };

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function CoachCard({ c, locale, tr, idx }: { c: Coach; locale: Locale; tr: Dict["coaches"]; idx: number }) {
  const [err, setErr] = useState(false);
  const name   = locale === "uz" ? c.nameUz : c.nameRu;
  const branch = locale === "uz" ? c.branchUz : c.branchRu;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: idx * 0.07, ease }}
      className="group overflow-hidden rounded-2xl border transition-all duration-300 hover:border-gold"
      style={{
        background:  "var(--bg-card)",
        borderColor: "var(--border)",
        boxShadow:   "var(--shadow)",
      }}
    >
      {/* Photo */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "3/4", background: "var(--bg-2)" }}
      >
        {err ? (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(160deg, var(--bg-2), var(--bg-card))" }}
          >
            <span className="text-5xl font-black gold-text">{name[0]}</span>
          </div>
        ) : (
          <img
            src={c.image}
            alt={name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
            onError={() => setErr(true)}
          />
        )}

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to top, var(--bg-card), transparent)" }}
        />

        {/* Branch chip */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ background: "var(--gold-dim)", color: "var(--gold)" }}
          >
            {branch}
          </span>
        </div>

        {/* Index */}
        <div className="absolute top-3 right-3">
          <span
            className="text-xs font-black"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            0{idx + 1}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5">
        <h3
          className="text-sm font-bold mb-3 leading-snug"
          style={{ color: "var(--fg)" }}
        >
          {name}
        </h3>

        {/* Schedule label */}
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: "var(--fg-muted)" }}
        >
          {tr.schedule}
        </p>

        {/* Days */}
        <div className="flex gap-1 flex-wrap">
          {tr.days.map((day, di) => {
            const active = c.days.includes(di);
            return (
              <span
                key={di}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-[11px] font-bold transition-colors"
                style={
                  active
                    ? { background: "var(--gold)", color: "#000" }
                    : { background: "var(--bg-2)", color: "var(--fg-muted)" }
                }
              >
                {day}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function Coaches({ locale, data, tr }: Props) {
  return (
    <section id="coaches" className="section-pad px-5 sm:px-10" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-14"
        >
          <div>
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
          </div>
          <p
            className="text-sm leading-relaxed max-w-xs sm:text-right"
            style={{ color: "var(--fg-muted)" }}
          >
            {tr.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {data.map((c, i) => (
            <CoachCard key={c.id} c={c} locale={locale} tr={tr} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
