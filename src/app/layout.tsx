import type { Metadata } from "next";
import { DM_Sans, Poppins, Sora } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { GoogleTagManager } from "@next/third-parties/google";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Nahara technologies plc",
  description:
    "We empower brands across the globe through cutting-edge software solutions, impact-driven brand strategies, data-backed marketing expertise, and built-in IT team with no hiring stress for SME's",
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
    <html lang="en" className="relative" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-NKM6HG5J" />
      <body
        className={clsx(
          dmSans.variable,
          sora.variable,
          poppins.variable,
          "antialiased min-h-screen transition-colors duration-300",
          "bg-[#feecea] text-black",
          "dark:bg-gray-900 dark:text-gray-100"
        )}
      >
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
