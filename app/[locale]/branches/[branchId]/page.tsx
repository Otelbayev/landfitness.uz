import { notFound } from "next/navigation";
import { locales, defaultLocale, branches } from "@/lib/siteConfig";
import type { Locale } from "@/lib/siteConfig";
import { t } from "@/lib/i18n";
import BranchDetail from "@/components/BranchDetail";
import type { Metadata } from "next";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    branches.map((b) => ({ locale, branchId: b.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; branchId: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, branchId } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;
  const branch = branches.find((b) => b.id === branchId);
  if (!branch) return {};
  const name = locale === "uz" ? branch.nameUz : branch.nameRu;
  return {
    title: `${name} — LandFitness`,
    description: `LandFitness ${name}. ${branch.phones.join(", ")}. 24/7.`,
  };
}

export default async function BranchPage({
  params,
}: {
  params: Promise<{ locale: string; branchId: string }>;
}) {
  const { locale: rawLocale, branchId } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  const branch = branches.find((b) => b.id === branchId);
  if (!branch) notFound();

  const tr = t(locale);

  return <BranchDetail branch={branch} locale={locale} tr={tr.branches} />;
}
