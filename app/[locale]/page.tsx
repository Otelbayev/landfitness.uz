import { locales, defaultLocale } from "@/lib/siteConfig";
import type { Locale } from "@/lib/siteConfig";
import { t } from "@/lib/i18n";
import { branches, pricing, coaches } from "@/lib/siteConfig";
import Hero        from "@/components/Hero";
import Marquee     from "@/components/Marquee";
import WhyUs       from "@/components/WhyUs";
import Branches    from "@/components/Branches";
import Pricing     from "@/components/Pricing";
import HowToJoin   from "@/components/HowToJoin";
import Coaches     from "@/components/Coaches";
import ContactForm from "@/components/ContactForm";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
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
    <>
      <Hero        locale={locale} hero={tr.hero} />
      <Marquee />
      <WhyUs       tr={tr.whyUs} />
      <Branches    locale={locale} data={branches} tr={tr.branches} />
      <Pricing     locale={locale} data={pricing}  tr={tr.pricing} />
      <HowToJoin   tr={tr.howToJoin} />
      <Coaches     locale={locale} data={coaches}  tr={tr.coaches} />
      <ContactForm locale={locale} tr={tr.contact} />
    </>
  );
}
