"use client";

import CallToAction from "@/components/CallToAction";
import { Footer } from "@/sections/Footer";
import Header from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import { OurTeam } from "@/sections/OurTeam";
import { ProductShowcase } from "@/sections/ProductShowcase";
import { Testimonials } from "@/sections/Testimonials";
import { QuickChatBox } from "@/components/QuickChatBox";
import TopButton from "@/components/topButton";
import LatestNews from "@/components/LatestNews";

export default function Home() {
  return (
    <div className="relative">

        <Hero />
        <LogoTicker />
        <ProductShowcase />
        <LatestNews />
        <OurTeam />
        <Testimonials />

        <section className="mt-20 w-full px-4 sm:px-6 lg:px-8">
          <CallToAction />
        </section>

        <QuickChatBox />
        <TopButton />

    </div>
  );
}
