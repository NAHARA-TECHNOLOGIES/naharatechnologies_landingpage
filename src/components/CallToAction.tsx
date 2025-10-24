"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const MotionH2 = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.h2),
  { ssr: false }
);

const MotionP = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.p),
  { ssr: false }
);

const CallToAction = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const dark = root.classList.contains("dark") || localStorage.getItem("theme") === "dark";
    setIsDarkMode(dark);
  }, []);

  return (
    <section
      className={`relative overflow-hidden rounded-3xl shadow-2xl my-20 mx-auto max-w-6xl text-white transition-colors duration-700 ${
        isDarkMode ? "dark-gradient" : "light-gradient"
      }`}
    >
      <div className="absolute inset-0 animate-gradient-move bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80 blur-3xl" />

      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px] opacity-10" />

      <div className="relative z-10 px-6 py-20 text-center sm:px-10 lg:px-20">
        <MotionH2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
        >
          Stay Ahead of the Curve with{" "}
          <span className="text-yellow-300">Nahara Technologes Updates</span>
        </MotionH2>

        <MotionP
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className={`mt-5 text-lg sm:text-xl max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-300" : "text-white/90"
          }`}
        >
          Join our newsletter for exclusive insights, innovations, and product updates from Nahara Tech.
        </MotionP>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/newsletter"
            className={`inline-block rounded-full font-semibold px-10 py-4 text-lg shadow-md transition-transform hover:scale-105 ${
              isDarkMode
                ? "bg-white text-indigo-800 hover:bg-gray-200"
                : "bg-yellow-300 text-indigo-700 hover:bg-yellow-200"
            }`}
          >
            Subscribe Now
          </Link>

          <Link
            href="/contact"
            className={`inline-block rounded-full border-2 font-semibold px-10 py-4 text-lg transition-all hover:scale-105 ${
              isDarkMode
                ? "border-gray-400 text-gray-100 hover:bg-white/10"
                : "border-white text-white hover:bg-white/10"
            }`}
          >
            Contact Us
          </Link>
        </MotionDiv>
      </div>
    </section>
  );
};

export default CallToAction;
