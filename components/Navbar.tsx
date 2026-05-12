"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/siteConfig";
import type { Dict } from "@/lib/i18n";

type Props = { locale: Locale; nav: Dict["nav"] };

const LINKS = (nav: Dict["nav"], locale: string) => [
  { href: "#branches",          label: nav.branches, page: false },
  { href: "#pricing",           label: nav.pricing,  page: false },
  { href: `/${locale}/coaches`, label: nav.coaches,  page: true  },
  { href: `/${locale}/contact`, label: nav.contact,  page: true  },
];

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Navbar({ locale, nav }: Props) {
  const pathname = usePathname();
  const other: Locale = locale === "uz" ? "ru" : "uz";
  const otherPath = pathname.replace(`/${locale}`, `/${other}`);

  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [dark,     setDark]     = useState(false);

  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("lf-theme", next ? "dark" : "light");
  }, [dark]);

  const links = LINKS(nav, locale);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background:     scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(2)" : "none",
        borderBottom:   scrolled ? "1px solid var(--border)" : "none",
        boxShadow:      scrolled ? "0 1px 30px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 h-[4.25rem] flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center shrink-0 gap-px">
          <span
            className="text-xl sm:text-2xl font-black tracking-tight leading-none"
            style={{ color: scrolled ? "var(--fg)" : "#fff" }}
          >
            Land
          </span>
          <span className="text-xl sm:text-2xl font-black tracking-tight leading-none gold-text">
            Fitness
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((l) => {
            const cls =
              "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/10";
            const style = { color: scrolled ? "var(--fg-2)" : "rgba(255,255,255,0.75)" };
            return l.page ? (
              <Link key={l.href} href={l.href} className={cls} style={style}>
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className={cls} style={style}>
                {l.label}
              </a>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Language */}
          <Link
            href={otherPath}
            className="hidden md:flex items-center px-3 py-1.5 rounded-lg text-xs font-black border transition-all duration-200 hover:border-gold hover:text-gold"
            style={{
              borderColor: scrolled ? "var(--border)" : "rgba(255,255,255,0.22)",
              color:       scrolled ? "var(--fg-muted)" : "rgba(255,255,255,0.60)",
            }}
          >
            {other.toUpperCase()}
          </Link>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 hover:border-gold"
            style={{
              borderColor: scrolled ? "var(--border)" : "rgba(255,255,255,0.22)",
              color:       scrolled ? "var(--fg)"     : "#fff",
            }}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl"
          >
            {[0, 1, 2].map(n => (
              <span
                key={n}
                className="block rounded-full transition-all duration-300"
                style={{
                  width:      n === 1 && !open ? "14px" : "18px",
                  height:     "2px",
                  background: scrolled ? "var(--fg)" : "#fff",
                  transform:
                    open
                      ? n === 0 ? "rotate(45deg) translate(5px, 5px)"
                      : n === 1 ? "scaleX(0)"
                      : "rotate(-45deg) translate(5px, -5px)"
                      : "none",
                  opacity: open && n === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="md:hidden"
            style={{
              background:     "var(--nav-bg)",
              backdropFilter: "blur(20px) saturate(2)",
              borderBottom:   "1px solid var(--border)",
            }}
          >
            <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1">
              {links.map((l, i) => {
                const cls =
                  "block px-4 py-3 rounded-xl text-base font-medium transition-colors hover:bg-[var(--bg-2)]";
                const style = { color: "var(--fg)" };
                return l.page ? (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={l.href} onClick={() => setOpen(false)} className={cls} style={style}>
                      {l.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setOpen(false)}
                    className={cls}
                    style={style}
                  >
                    {l.label}
                  </motion.a>
                );
              })}

              <div
                className="pt-3 mt-1 border-t flex items-center justify-between"
                style={{ borderColor: "var(--border)" }}
              >
                <Link
                  href={otherPath}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-black border transition-all hover:border-gold hover:text-gold"
                  style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
                >
                  {other.toUpperCase()}
                </Link>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition-all hover:border-gold hover:text-gold"
                  style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
                >
                  {dark ? <SunIcon /> : <MoonIcon />}
                  {dark ? "Light" : "Dark"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
