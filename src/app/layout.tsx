import type { Metadata } from "next";
import { Pixelify_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/ui/Footer";

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
  title: "Katy Diaz",
  description: "Portfolio of Katy Diaz",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${pixelify.variable} antialiased`}>
        {children}
        <Footer/>
      </body>
    </html>
  );
}