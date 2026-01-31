import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/ui/Footer";
import Greetings from "../components/ui/Greetings";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fearRobot = localFont({
  src: [
    {
      path: "../../public/fonts/FearRobot-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-fear-robot",
});

export const metadata: Metadata = {
  title: "Katy Diaz",
  description: "Portfolio of Katy Diaz",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body
        className={`${fearRobot.variable} antialiased`}
      >
        <Greetings/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}