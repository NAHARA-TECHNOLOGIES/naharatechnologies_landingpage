"use client";

import Image from "next/image";
import pyramidImage from "@/assets/roundIcon2.png";
import tubeImage from "@/assets/roundIcon3.png";
import { OurProducts } from "@/sections/OurProducts";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
   <section
  ref={sectionRef}
  className="bg-gradient-to-b from-[#ffffff] to-[#fcb5b0] 
             dark:from-gray-950 dark:to-gray-800 
             text-gray-900 dark:text-gray-100 
             py-24 overflow-x-clip transition-colors duration-300"
>
  <div className="container">
    <div className="section-heading">
      <div className="flex justify-center">
        <div className="tag text-gray-600 dark:text-gray-300">
          Get your idea to live with Nahara-T
        </div>
      </div>
      <h2 className="section-title mt-5">Branding made easy for you, by us.</h2>
      <p className="section-description mt-5">
        You are one step away from effortlessly turning your idea into a
        full product, ready to be bought.
      </p>
    </div>

    <div className="relative">
      <OurProducts />
      <motion.img
        src={pyramidImage.src}
        alt="pyramid image"
        height={262}
        width={262}
        className="hidden md:block absolute -right-36 -top-32"
        style={{ translateY }}
      />
      <motion.img
        src={tubeImage.src}
        alt="Tube image"
        height={248}
        width={248}
        className="hidden md:block absolute bottom-24 -left-44"
        style={{ translateY }}
      />
    </div>
  </div>
</section>

  );
};
