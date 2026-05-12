import { locales, defaultLocale, coaches } from "@/lib/siteConfig";
import type { Locale } from "@/lib/siteConfig";
import { t } from "@/lib/i18n";
import Coaches from "@/components/Coaches";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function CoachesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;
  const tr = t(locale);

  return (
    <div className="pt-16">
      {/* Page hero */}
      <div
        className="section-pad px-5 sm:px-8"
        style={{
          background: "linear-gradient(135deg, var(--bg-2) 0%, var(--bg) 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--gold)" }}>
            LandFitness
          </p>
          <h1 className="text-5xl sm:text-6xl font-black mb-3" style={{ color: "var(--fg)" }}>
            {tr.coaches.titleAccent}
          </h1>
          <p className="text-base" style={{ color: "var(--fg-muted)" }}>{tr.coaches.subtitle}</p>
        </div>
      </div>

      {/* Coaches grid — reuse the same component but without section padding */}
      <Coaches locale={locale} data={coaches} tr={tr.coaches} />
    </div>
  );
}
