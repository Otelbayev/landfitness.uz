import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/siteConfig";

export default function Root() {
  redirect(`/${defaultLocale}`);
}
