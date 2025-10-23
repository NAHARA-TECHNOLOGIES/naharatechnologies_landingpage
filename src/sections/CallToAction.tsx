"use client";

import ArrowRight from "@/assets/arrow-right.svg";
import starImage from "@/assets/star2.png";
import springImage from "@/assets/spring2.png";
import Image from "next/image";
import {motion, useScroll, useTransform} from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return(
    <section
     ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#ffd4d2] py-24 overflow-x-clip">
      <div className="container">
      <div className="section-heading relative">
      <h2 className="section-title dark:text-gray-900">Sign up for our newsletter</h2>
      <p className="section-description mt-5">
        Be the first to know about any new update 
        or promo from Nahara-T, Never miss out.
        </p>
        <motion.img
         src={starImage.src}
          alt="Star image" 
          width={360} 
          className="absolute -left-[350px] -top-[137px]" 
          style={{
            translateY: translateY,
          }}
          />
          <motion.img
           src={springImage.src}
            alt="Spring image"
            width={360}
            className="absolute -right-[331px] -top-[100px] rotate-[60deg]"
            style={{
              rotate: 30,
              translateY: translateY,
            }}
             />
        </div>
        <div className="flex gap-2 mt-10 justify-center">
          <button className="p-3 btn-primary text-white font-medium">Sign up now</button>
          <button className="btn btn-text gap-1">
            <span>Learn more</span>
            <ArrowRight className="h-5 w-5"/>
          </button>
        </div>
      </div>
    </section>
  );
};
