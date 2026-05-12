"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

type Props = { tr: Dict["howToJoin"] };

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HowToJoin({ tr }: Props) {
  return (
    <section className="section-pad px-5 sm:px-10" style={{ background: "var(--bg-2)" }}>
      <div className="max-w-5xl mx-auto">

        {/* ── Heading ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16 sm:mb-20"
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

        {/* ── Steps ───────────────────────────────────────── */}
        <div className="relative">

          {/* Desktop horizontal connector line */}
          <div
            className="hidden sm:block absolute"
            style={{
              top:        "2.5rem",
              left:       "calc(100% / 6)",
              right:      "calc(100% / 6)",
              height:     "1px",
              background: "linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold-dim))",
              opacity:    0.5,
            }}
          />

          <div className="grid sm:grid-cols-3 gap-10 sm:gap-8">
            {tr.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.14, ease }}
                className="flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div className="relative mb-7">
                  {/* Outer glow ring */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "var(--gold-dim)",
                      transform:  "scale(1.35)",
                    }}
                  />
                  <div
                    className="relative w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark))",
                      boxShadow:  "0 6px 36px rgba(201,162,39,0.40)",
                    }}
                  >
                    <span
                      className="text-2xl font-black leading-none"
                      style={{ color: "#000" }}
                    >
                      {step.n}
                    </span>
                  </div>
                </div>

                {/* Step label chip */}
                <span
                  className="text-[10px] font-black uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
                  style={{ background: "var(--gold-dim)", color: "var(--gold)" }}
                >
                  {tr.title} {step.n}
                </span>

                <h3
                  className="text-lg font-bold mb-2 leading-snug"
                  style={{ color: "var(--fg)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {step.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="text-center mt-14"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl font-black text-sm tracking-wide transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark))",
              color:      "#000",
              boxShadow:  "0 6px 36px rgba(201,162,39,0.40)",
            }}
          >
            {tr.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
