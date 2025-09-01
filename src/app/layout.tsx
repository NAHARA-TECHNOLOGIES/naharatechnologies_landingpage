import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import TopButton from "@/components/topButton";
import { QuickChatBox } from "@/components/QuickChatBox";
import { GoogleTagManager } from "@next/third-parties/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Nahara technologies plc",
  description:
    "We empower brands across the globe through cutting-edge software solutions, impact-driven brand strategies, data-backed marketing expertise,and built-in IT team with no hiring stress for SME's",
  icons: {
    icon: "/NaharaIcon2.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <GoogleTagManager gtmId="GTM-NKM6HG5J" />
      <body className={clsx(dmSans.className, "antialiased bg-[#feecea]")}>
        <Header />
        <TopButton />
        <QuickChatBox />
        {children}
        <Footer />
      </body>
    </html>
  );
}
