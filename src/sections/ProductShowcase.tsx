"use client";

import Image from "next/image";
import pyramidImage from "@/assets/roundIcon2.png";
import tubeImage from "@/assets/roundIcon3.png";
import { OurProducts } from "@/sections/OurProducts";
import {
  motion,
  useScroll,
  useTransform,
  useInView
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const ProductShowcase = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.2, 1, 0.3]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = (e: any) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 40;
    const y = (clientY / window.innerHeight - 0.5) * 40;
    setMouse({ x, y });
  };

  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="
        relative isolate 
        bg-gradient-to-b from-white via-[#fff4f3] to-[#fcb5b0]/40
        dark:from-gray-950 dark:via-gray-900 dark:to-gray-800
        py-24 md:py-32 
        overflow-hidden 
        transition-all duration-300
        px-4 sm:px-8 lg:px-16
      "
    >
      <motion.div className="absolute inset-0 -z-10" style={{ opacity: fadeOpacity }}>
        <div className="absolute top-[-10%] right-[20%] w-64 h-64 rounded-full bg-red-200/40 dark:bg-red-900/20 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[10%] w-80 h-80 rounded-full bg-pink-300/30 dark:bg-pink-800/20 blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <span
            className="
              inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-semibold 
              bg-red-100 dark:bg-red-900/40 
              text-red-700 dark:text-red-400 tracking-wide uppercase
            "
          >
            Get your idea to live with Nahara-T
          </span>

        <h2
          className="
            mt-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl
            font-extrabold tracking-tight leading-tight
            bg-gradient-to-r from-red-700 via-red-500 to-white/50
            bg-clip-text text-transparent
            animate-gradient-x
          "
        >
          Branding made easy for you, by us.
        </h2>



        <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed 
              bg-gradient-to-r from-red-800 to-slate-500
                    text-transparent bg-clip-text">
        You’re one step away from effortlessly transforming your idea into a fully developed,
        beautifully branded product ready for the market.
      </p>

        </motion.div>

        <div className="relative mt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="w-full"
          >
            <OurProducts />
          </motion.div>

          <motion.div
            animate={isMobile ? {} : { x: mouse.x, y: mouse.y }}
            transition={{ type: "spring", stiffness: 40, damping: 20 }}
            className="hidden md:block absolute -right-36 lg:-right-48 -top-28"
          >
            <motion.img
              src={pyramidImage.src}
              height={260}
              width={260}
              alt="Pyramid Icon"
              style={{ translateY }}
              className="opacity-90 hover:opacity-100 transition-all duration-500"
            />
          </motion.div>

          <motion.div
            animate={isMobile ? {} : { x: -mouse.x, y: -mouse.y }}
            transition={{ type: "spring", stiffness: 40, damping: 20 }}
            className="hidden md:block absolute bottom-24 -left-44 lg:-left-56"
          >
            <motion.img
              src={tubeImage.src}
              height={248}
              width={248}
              alt="Tube Icon"
              style={{ translateY }}
              className="opacity-90 hover:opacity-100 transition-all duration-500"
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fcb5b0]/40 dark:from-gray-950/80 to-transparent pointer-events-none" />
    </section>
  );
};
