"use client";

import WhatWeDo from "@/sections/WhatWeDo";
import HowWeWork from "@/sections/HowWeWork";
import WhyChooseUs from "@/sections/WhyChooseUs";
import MissionVision from "@/sections/MissionVision";
import AboutHero from "@/sections/AboutHero";
import CoreValues from "@/sections/CoreValues";
import { OurTeam } from "@/sections/OurTeam";
import OurStory from "@/sections/OurStory";

export default function About() {
  return (
    <section className="mx-auto text-gray-800 overflow-x-hidden">
      <AboutHero />
      {/* <WhatWeDo /> */}
      <OurStory/>
      <HowWeWork />
      <WhyChooseUs />
      <OurTeam />
      <MissionVision />
      <CoreValues />
    </section>
  );
}
