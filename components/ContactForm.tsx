"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/siteConfig";
import type { Dict } from "@/lib/i18n";
import { branches } from "@/lib/siteConfig";

type Props  = { locale: Locale; tr: Dict["contact"] };
type Status = "idle" | "sending" | "ok" | "err";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
        style={{ background: "var(--gold-dim)", color: "var(--gold)" }}
      >
        {icon}
      </div>
      <div>
        <p
          className="text-xs font-bold uppercase tracking-wider mb-0.5"
          style={{ color: "var(--fg-muted)" }}
        >
          {label}
        </p>
        <p className="text-sm font-bold" style={{ color: "var(--fg)" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: "var(--fg-muted)" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm({ locale, tr }: Props) {
  const [name,   setName]   = useState("");
  const [phone,  setPhone]  = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !branch) return;
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, phone, branch }),
      });
      if (r.ok) {
        setStatus("ok");
        setName("");
        setPhone("");
        setBranch("");
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  };

  return (
    <section
      id="contact"
      className="section-pad px-5 sm:px-10"
      style={{ background: "var(--bg-2)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Heading ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
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
          <p
            className="text-sm mt-3 max-w-lg leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            {tr.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_480px] gap-8 lg:gap-12 items-start">

          {/* ── Left: Contact info ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="space-y-4"
          >
            {/* Hours */}
            <InfoCard
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              }
              label={tr.hours}
              value={tr.hoursVal}
            />

            {/* Branch contacts */}
            {branches.map(b => (
              <div key={b.id} className="card p-5">
                <p
                  className="text-xs font-black uppercase tracking-widest mb-4"
                  style={{ color: "var(--gold)" }}
                >
                  {locale === "uz" ? b.nameUz : b.nameRu}
                </p>
                <div className="flex flex-col gap-2.5">
                  {b.phones.map(p => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 group"
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "var(--gold-dim)" }}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--gold)"
                          strokeWidth="2"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.72 18l.2-1.08z"/>
                        </svg>
                      </div>
                      <span
                        className="text-sm font-semibold transition-colors group-hover:text-gold"
                        style={{ color: "var(--fg-2)" }}
                      >
                        {p}
                      </span>
                    </a>
                  ))}
                  <a
                    href={b.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 mt-1 text-xs font-semibold transition-colors hover:text-gold"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {locale === "uz" ? "Xaritada ko'rish ↗" : "Показать на карте ↗"}
                  </a>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── Right: Form ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="card p-6 sm:p-8"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            {status === "ok" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease }}
                className="flex flex-col items-center text-center py-10"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "var(--gold-dim)" }}
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="2.5"
                  >
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--fg)" }}>
                  {locale === "uz" ? "Yuborildi!" : "Отправлено!"}
                </h3>
                <p className="text-sm mb-8" style={{ color: "var(--fg-muted)" }}>
                  {tr.success}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-7 py-3 rounded-2xl text-sm font-bold transition-all hover:scale-[1.03] active:scale-[0.97]"
                  style={{
                    background: "linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark))",
                    color:      "#000",
                  }}
                >
                  OK
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-5">
                <div className="mb-1">
                  <h3 className="text-lg font-black mb-1" style={{ color: "var(--fg)" }}>
                    {locale === "uz" ? "Ma'lumotlaringizni kiriting" : "Заполните форму"}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                    {locale === "uz"
                      ? "Biz siz bilan tez orada bog'lanamiz"
                      : "Мы свяжемся с вами в ближайшее время"}
                  </p>
                </div>

                <FormField label={tr.name}>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={tr.name}
                    required
                    className="form-input"
                  />
                </FormField>

                <FormField label={tr.phone}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+998 XX XXX XX XX"
                    required
                    className="form-input"
                  />
                </FormField>

                <FormField label={tr.branch}>
                  <select
                    value={branch}
                    onChange={e => setBranch(e.target.value)}
                    required
                    className="form-input"
                    style={{ cursor: "pointer" }}
                  >
                    <option value="">{tr.branch}</option>
                    <option value={tr.branchOptions.chilonzor}>
                      {tr.branchOptions.chilonzor}
                    </option>
                    <option value={tr.branchOptions.sergeli}>
                      {tr.branchOptions.sergeli}
                    </option>
                  </select>
                </FormField>

                {status === "err" && (
                  <p className="text-sm text-red-500 -mt-1">{tr.error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 w-full py-4 rounded-2xl font-black text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark))",
                    color:      "#000",
                    boxShadow:  "0 4px 28px rgba(201,162,39,0.35)",
                  }}
                >
                  {status === "sending" ? tr.sending : tr.submit}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
