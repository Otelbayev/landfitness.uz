import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "LandFitness – Premium Fitness Club",
  description:
    "LandFitness — Toshkentdagi zamonaviy fitnes markaz. 24/7 ochiq, 2 ta filial: Chilonzor va Sergeli.",
  keywords: "landfitness, fitnes, sport, gym, Toshkent, Chilonzor, Sergeli",
  openGraph: {
    title: "LandFitness",
    description: "Premium fitnes markaz — 24/7",
    siteName: "LandFitness",
  },
};

const themeScript = `
(function(){
  try{
    var t=localStorage.getItem('lf-theme');
    if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){
      document.documentElement.classList.add('dark');
    }
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
      lang="uz"
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
