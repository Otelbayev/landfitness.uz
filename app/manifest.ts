import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LandFitness — Premium Fitnes Klub Toshkent",
    short_name: "LandFitness",
    description:
      "Toshkentdagi premium fitnes markaz. Chilonzor va Sergeli filiallari, 24/7 ochiq.",
    start_url: "/uz",
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#c9a227",
    lang: "uz",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
      {
        src: "/apple-icon.jpg",
        sizes: "any",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["health", "fitness", "lifestyle", "sports"],
  };
}
