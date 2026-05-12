import { locales, defaultLocale } from "@/lib/siteConfig";
import type { Locale } from "@/lib/siteConfig";
import { t } from "@/lib/i18n";
import ContactForm from "@/components/ContactForm";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
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
        className="py-16 sm:py-20 px-5 sm:px-8"
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
            {tr.contact.titleAccent}
          </h1>
          <p className="text-base max-w-lg" style={{ color: "var(--fg-muted)" }}>{tr.contact.subtitle}</p>
        </div>
      </div>

      <ContactForm locale={locale} tr={tr.contact} />
    </div>
  );
}
