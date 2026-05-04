import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Land Fitness | Premium Gym in Tashkent",
    template: "%s | Land Fitness",
  },
  description:
    "Land Fitness — premium fitness club in Tashkent. Modern equipment, professional trainers, and energetic atmosphere. Join now and transform your body.",
  keywords: [
    "gym tashkent",
    "fitness club tashkent",
    "land fitness",
    "personal trainer",
    "спортзал ташкент",
    "fitnes markazi toshkent",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://landfitness.uz",
    siteName: "Land Fitness",
    title: "Land Fitness | Premium Gym in Tashkent",
    description:
      "Premium fitness club in Tashkent with modern equipment and professional trainers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Land Fitness | Premium Gym in Tashkent",
    description: "Premium fitness club in Tashkent.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
