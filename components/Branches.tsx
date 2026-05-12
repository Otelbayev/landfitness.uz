"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Locale } from "@/lib/siteConfig";
import type { Dict } from "@/lib/i18n";
import { branches as BranchType } from "@/lib/siteConfig";

type Branch = typeof BranchType[number];
type Props  = { locale: Locale; data: Branch[]; tr: Dict["branches"] };

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function BranchCard({ b, locale, tr, i }: { b: Branch; locale: Locale; tr: Dict["branches"]; i: number }) {
  const name = locale === "uz" ? b.nameUz : b.nameRu;

  return (
    <motion.div
      initial={{ opacity: 0, y: 52 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: i * 0.14, ease }}
    >
      <Link href={`/${locale}/branches/${b.id}`} className="block group focus:outline-none">
        <article
          className="relative overflow-hidden rounded-3xl"
          style={{
            aspectRatio: "3/4",
            boxShadow:   "var(--shadow-lg)",
          }}
        >
          {/* Background image */}
          <img
            src={b.bgImage}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.08) 100%)",
            }}
          />

          {/* Gold shimmer on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(135deg, rgba(201,162,39,0.14) 0%, transparent 55%)",
            }}
          />

          {/* Gold border ring on hover */}
          <div
            className="absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-500"
            style={{ borderColor: "rgba(201,162,39,0)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,162,39,0.6)";
            }}
          />

          {/* 24/7 badge */}
          <div className="absolute top-5 right-5">
            <span
              className="px-3.5 py-1.5 rounded-full text-xs font-black tracking-widest"
              style={{ background: "var(--gold)", color: "#000" }}
            >
              24 / 7
            </span>
          </div>

          {/* Index number */}
          <div className="absolute top-5 left-5">
            <span
              className="text-xs font-black tracking-widest"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              0{i + 1}
            </span>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
              style={{ color: "var(--gold)" }}
            >
              LandFitness
            </p>
            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-4">
              {name}
            </h3>

            {/* Phones */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6">
              {b.phones.map(p => (
                <span key={p} className="text-sm text-white/55">
                  {p}
                </span>
              ))}
            </div>

            {/* CTA */}
            <span
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 group-hover:gap-4 group-hover:shadow-[0_0_30px_rgba(201,162,39,0.4)]"
              style={{
                background: "linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark))",
                color:      "#000",
              }}
            >
              {tr.viewBranch}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export default function Branches({ locale, data, tr }: Props) {
  return (
    <section id="branches" className="section-pad px-5 sm:px-10" style={{ background: "var(--bg-2)" }}>
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

          <a
            href="#contact"
            className="self-start sm:self-end inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 hover:border-gold hover:text-gold"
            style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
          >
            {locale === "uz" ? "A'zo bo'lish" : "Вступить"}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {data.map((b, i) => (
            <BranchCard key={b.id} b={b} locale={locale} tr={tr} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
