import type { MetadataRoute } from "next";
import { branches, locales } from "@/lib/siteConfig";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = ["", "/coaches", "/contact"];

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${SITE_URL}/uz${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [
          l === "uz" ? "uz-UZ" : "ru-RU",
          `${SITE_URL}/${l}${path}`,
        ])
      ),
    },
    images: [`${SITE_URL}/logo.jpg`],
  }));

  const branchEntries: MetadataRoute.Sitemap = branches.map((b) => ({
    url: `${SITE_URL}/uz/branches/${b.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [
          l === "uz" ? "uz-UZ" : "ru-RU",
          `${SITE_URL}/${l}/branches/${b.id}`,
        ])
      ),
    },
    images: [
      `${SITE_URL}${b.bgImage}`,
      ...b.images.map((img) => `${SITE_URL}${img}`),
    ],
  }));

  return [...staticEntries, ...branchEntries];
}
