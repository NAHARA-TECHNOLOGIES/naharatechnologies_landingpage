import About from "./About";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Nahara Technologies PLC",
  description:
    "Discover the story of Nahara Technologies PLC, our mission, vision, and values. Learn how we innovate to bridge the gap between branding and technology while empowering businesses to thrive.",
  icons: {
    icon: "/NaharaIcon2.ico",
  },
};

export default function AboutPage() {
  return <About />;
}
