import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import copy from "@/content/copy.ru.json";
import "./globals.css";

const manrope = localFont({
  src: "../assets/fonts/Manrope-wght.ttf",
  variable: "--font-heading",
  display: "swap",
  weight: "200 800",
});

const golos = localFont({
  src: "../assets/fonts/GolosText-wght.ttf",
  variable: "--font-body",
  display: "swap",
  weight: "400 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vsvdesignpro.github.io/lotos2/"),
  title: copy.meta.title,
  description: copy.meta.description,
  applicationName: "LOTOS",
  category: "travel",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "LOTOS",
    title: copy.meta.title,
    description: copy.meta.description,
    images: [{ url: "/lotos2/images/hero.jfif", width: 2752, height: 1536, alt: copy.hero.title }],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F0E",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${golos.variable}`}>
      <body>{children}</body>
    </html>
  );
}
