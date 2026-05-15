import type { Metadata } from "next";
import { Pixelify_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import JsonLd from "../components/ui/JsonLd";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from "@vercel/analytics/next"
import Clarity from '@microsoft/clarity';

const projectId = "wr8nenq7yz"

Clarity.init(projectId);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://katydiazbeltran.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pixelify",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Katy Díaz Beltrán | Frontend Developer · Barranquilla, Colombia",
    template: "%s | Katy Díaz Beltrán",
  },

  description: "Desarrolladora frontend en Barranquilla, Colombia. Especializada en React, Next.js, TypeScript y animaciones con GSAP. Disponible para proyectos remotos y presenciales.",

  keywords: [
    "desarrolladora frontend barranquilla",
    "programadora web barranquilla",
    "freelance web barranquilla",
    "desarrolladora web barranquilla",
    "frontend colombia",
    "desarrolladora frontend colombia",
    "programadora web colombia",
    "freelance frontend colombia",
    "desarrolladora react colombia",
    "frontend remoto colombia",
    "paginas web barranquilla",
    "frontend developer barranquilla",
    "web developer barranquilla",
    "freelance web developer barranquilla",
    "frontend developer colombia",
    "react developer colombia",
    "remote frontend developer colombia",
    "nextjs developer colombia",
    "katy diaz beltran",
    "katy díaz beltrán",
    "katydiazbeltran",
    "katy diaz portfolio",
    "kdb"
  ],

  authors: [
    {
      name: "Katy Díaz Beltrán",
      url: "https://www.linkedin.com/in/kdiaz11/",
    },
  ],
  creator: "Katy Díaz Beltrán",
  publisher: "Katy Díaz Beltrán",

  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: "Katy Díaz Beltrán — Frontend Developer",
    title: "Katy Díaz Beltrán | Frontend Developer Freelance · Barranquilla",
    description:
      "Desarrolladora frontend freelance en Barranquilla, Colombia. React, Next.js, TypeScript y animaciones web. Disponible remoto.",
    images: [
      {
        url: "https://res.cloudinary.com/dvodvcoxo/image/upload/v1777701224/metaimage_hppaqt.png",
        width: 1200,
        height: 630,
        alt: "Katy Díaz Beltrán — Frontend Developer Freelance Barranquilla Colombia",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${pixelify.variable} antialiased`}>
        <JsonLd siteUrl={SITE_URL} />
        <Header />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-FT393F8QK6" />
      <Analytics />
    </html>
  );
}