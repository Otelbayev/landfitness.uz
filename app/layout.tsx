import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://landfitness.uz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "LandFitness — Toshkentdagi Premium Fitnes Klub | Chilonzor & Sergeli 24/7",
    template: "%s | LandFitness",
  },
  description:
    "LandFitness — Toshkentdagi zamonaviy premium fitnes markaz. 2 ta filial: Chilonzor va Sergeli. 24/7 ochiq, professional murabbiylar, zamonaviy jihozlar, erkaklar va ayollar uchun abonementlar.",
  applicationName: "LandFitness",
  generator: "Next.js",
  keywords: [
    "landfitness",
    "land fitness",
    "fitnes",
    "fitness",
    "Toshkent fitnes",
    "Tashkent fitness",
    "gym Toshkent",
    "sport zal Toshkent",
    "fitnes Chilonzor",
    "fitnes Sergeli",
    "Chilonzor sport zal",
    "Sergeli sport zal",
    "trenajor zali",
    "tренажерный зал",
    "ayollar fitnes",
    "erkaklar fitnes",
    "premium fitnes",
    "24/7 sport zal",
    "fitnes klub",
    "shaxsiy murabbiy",
    "abonement",
    "trener Toshkent",
  ],
  authors: [{ name: "LandFitness", url: SITE_URL }],
  creator: "LandFitness",
  publisher: "LandFitness",
  category: "fitness",
  alternates: {
    canonical: "/",
    languages: {
      "ru-RU": "/ru",
      "uz-UZ": "/uz",
      "x-default": "/ru",
    },
  },
  openGraph: {
    type: "website",
    siteName: "LandFitness",
    title: "LandFitness — Premium Fitnes Markaz, Toshkent (24/7)",
    description:
      "Chilonzor va Sergeli filiallari, professional murabbiylar, zamonaviy jihozlar. Hoziroq ro'yxatdan o'ting!",
    url: SITE_URL,
    locale: "ru_RU",
    alternateLocale: ["uz_UZ"],
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "LandFitness — Premium Fitnes Klub Toshkent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LandFitness — Premium Fitnes Markaz, Toshkent",
    description:
      "Zamonaviy fitnes klub Toshkentda. 2 filial — Chilonzor va Sergeli. 24/7 ochiq.",
    images: ["/logo.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.jpg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.jpg",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Theme bootstrap (runs before paint to avoid flash).
 * Manual preference ('lf-theme' = 'light' | 'dark') wins.
 * Otherwise auto-by-time: day (07:00–18:59) = light, night = dark.
 */
const themeScript = `
(function(){
  try{
    var t=localStorage.getItem('lf-theme');
    var dark;
    if(t==='dark') dark=true;
    else if(t==='light') dark=false;
    else { var h=new Date().getHours(); dark=h<7||h>=19; }
    if(dark) document.documentElement.classList.add('dark');
  }catch(e){}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${syne.variable} ${inter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
