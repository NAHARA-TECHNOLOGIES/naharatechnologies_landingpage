"use client";

import WhatWeDo from "@/sections/WhatWeDo";
import HowWeWork from "@/sections/HowWeWork";
import WhyChooseUs from "@/sections/WhyChooseUs";
import MissionVision from "@/sections/MissionVision";
import AboutHero from "@/sections/AboutHero";
import CoreValues from "@/sections/CoreValues";

export default function About() {
  return (
    <section className="mx-auto text-gray-800 overflow-x-hidden">
      <AboutHero />
      <WhatWeDo />
      <HowWeWork />
      <WhyChooseUs />
      <MissionVision />
      <CoreValues />
    </section>
  );
}
