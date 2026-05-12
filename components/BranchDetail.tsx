"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Locale } from "@/lib/siteConfig";
import type { Dict } from "@/lib/i18n";
import { branches as BranchType } from "@/lib/siteConfig";

type Branch = typeof BranchType[number];
type Props  = { branch: Branch; locale: Locale; tr: Dict["branches"] };

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Lightbox ──────────────────────────────────────────────── */
function Lightbox({
  images,
  start,
  onClose,
}: {
  images: string[];
  start: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(start);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-100 flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.93)" }}
        onClick={onClose}
      >
        {/* Close */}
        <button
          className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white border border-white/20 hover:border-white/50 transition-all"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Image */}
        <motion.img
          key={idx}
          src={images[idx]}
          alt=""
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold text-white border border-white/20 hover:border-gold hover:text-gold transition-all"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold text-white border border-white/20 hover:border-gold hover:text-gold transition-all"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              ›
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-sm">
          {idx + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function BranchDetail({ branch, locale, tr }: Props) {
  const name     = locale === "uz" ? branch.nameUz : branch.nameRu;
  const [light, setLight] = useState<number | null>(null);

  return (
    <>
      {/* Lightbox */}
      {light !== null && (
        <Lightbox images={branch.images} start={light} onClose={() => setLight(null)} />
      )}

      {/* ── Hero banner ─────────────────────────────────────── */}
      <section className="relative h-64 sm:h-96 overflow-hidden">
        <img src={branch.bgImage} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-5 sm:px-8 pb-7 sm:pb-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--gold)" }}>LandFitness</p>
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-none">{name}</h1>
            </div>
            <span className="px-4 py-1.5 rounded-full text-sm font-black" style={{ background: "var(--gold)", color: "#000" }}>24 / 7</span>
          </div>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        {/* Back */}
        <Link
          href={`/${locale}#branches`}
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors hover:text-gold"
          style={{ color: "var(--fg-muted)" }}
        >
          ← {tr.back.replace("← ", "")}
        </Link>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14">
          {/* ── LEFT: Gallery ─────────────────────────────── */}
          <div>
            <SectionLabel>{tr.gallery}</SectionLabel>

            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {branch.images.map((src, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease }}
                  onClick={() => setLight(i)}
                  className={[
                    "relative overflow-hidden rounded-xl group",
                    /* First image spans 2 cols */
                    i === 0 ? "col-span-2 sm:col-span-2 row-span-1" : "",
                  ].join(" ")}
                  style={{ aspectRatio: i === 0 ? "16/9" : "4/3", background: "var(--bg-card)" }}
                >
                  <img
                    src={src}
                    alt={`${name} ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                    <svg className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Contacts + Map ──────────────────────── */}
          <div className="space-y-5">
            {/* Phones */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
              className="card p-5"
            >
              <SectionLabel>{tr.contacts}</SectionLabel>
              <div className="flex flex-col gap-2 mt-3">
                {branch.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all group hover:border-gold"
                    style={{ borderColor: "var(--border)", background: "var(--bg)" }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors group-hover:bg-gold"
                      style={{ background: "var(--gold-dim)" }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.72 18l.2-1.08z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{phone}</span>
                    <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Yandex map */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease }}
              className="card overflow-hidden"
            >
              <iframe
                src={branch.mapEmbed}
                width="100%"
                height="300"
                frameBorder="0"
                allowFullScreen
                title={`${name} xarita`}
                style={{ display: "block" }}
              />
              <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
                <span className="text-xs" style={{ color: "var(--fg-muted)" }}>Yandex Maps</span>
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold transition-colors hover:text-gold-dark"
                  style={{ color: "var(--gold)" }}
                >
                  {tr.openInMap}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" /></svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--fg-muted)" }}>
      {children}
    </p>
  );
}

