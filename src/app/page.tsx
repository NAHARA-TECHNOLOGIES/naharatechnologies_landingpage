"use client";

import { CallToAction } from "@/sections/CallToAction";
import { Footer } from "@/sections/Footer";
import Header from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import { OurTeam } from "@/sections/OurTeam";
import { ProductShowcase } from "@/sections/ProductShowcase";
import { Testimonials } from "@/sections/Testimonials";
import { QuickChatBox } from "@/components/QuickChatBox";
import TopButton from "@/components/topButton";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <OurTeam />
      <Testimonials />
      <CallToAction />
      <QuickChatBox />
      <TopButton />
    </>

  );
}
