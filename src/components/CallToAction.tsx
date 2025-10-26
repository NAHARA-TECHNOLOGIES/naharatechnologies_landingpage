"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Image from "next/image";
import SubImage from "@/assets/SubIm.png";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), { ssr: false });
const MotionH2 = dynamic(() => import("framer-motion").then((mod) => mod.motion.h2), { ssr: false });
const MotionP = dynamic(() => import("framer-motion").then((mod) => mod.motion.p), { ssr: false });

const CallToAction = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    frequency: "weekly",
    category: "Technology",
  });

  useEffect(() => {
    const root = document.documentElement;
    const dark = root.classList.contains("dark") || localStorage.getItem("theme") === "dark";
    setIsDarkMode(dark);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }
    toast.success("Subscribed successfully!");
    setShowModal(false);
    setFormData({ email: "", frequency: "weekly", category: "Technology" });
  };

  return (
    <section
      className={`relative overflow-hidden rounded-[2rem] my-16 sm:my-24 mx-auto max-w-7xl w-full px-6 sm:px-10 lg:px-16 py-20 shadow-[0_0_60px_-15px_rgba(255,255,255,0.2)] transition-all duration-700 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-red-600 via-rose-500 to-orange-400"
      }`}
    >
      {/* Floating Gradient Orbs */}
      <div className="absolute -top-20 -right-32 w-[400px] h-[400px] bg-red-400/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute -bottom-24 -left-20 w-[300px] h-[300px] bg-indigo-500/20 blur-3xl rounded-full animate-pulse delay-1000" />

      {/* Grid Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 text-center lg:text-left">
        {/* Text Section */}
        <div className="space-y-6">
          <MotionH2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
          >
            Elevate Your Growth with{" "}
            <span
              className={`bg-clip-text text-transparent ${
                isDarkMode
                  ? "bg-gradient-to-r from-rose-400 via-red-300 to-yellow-300"
                  : "bg-gradient-to-r from-red-800 via-orange-600 to-yellow-500"
              }`}
            >
              Nahara Technologies
            </span>{" "}
            Newsletter
          </MotionH2>

          <MotionP
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className={`max-w-xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl ${
              isDarkMode ? "text-gray-300" : "text-white/90"
            }`}
          >
            Stay informed with curated insights, innovation trends, and product updates from the future of tech.
          </MotionP>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <button
              onClick={() => setShowModal(true)}
              className={`relative inline-flex items-center justify-center gap-2 rounded-full font-semibold text-lg px-10 py-4 transition-all duration-300 shadow-lg hover:scale-105 ${
                isDarkMode
                  ? "bg-gradient-to-r from-rose-600 to-red-500 text-white hover:shadow-red-600/40"
                  : "bg-white text-red-700 hover:bg-gray-100"
              }`}
            >
              Subscribe Now
              <svg
                className="w-5 h-5 animate-bounce-x"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                viewBox="0 0 24 24"
              >
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </MotionDiv>
        </div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-[400px] sm:w-[480px] md:w-[520px]">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative"
            >
              <Image
                src={SubImage}
                alt="Subscriber Illustration"
                width={500}
                height={500}
                className="rounded-2xl shadow-2xl object-contain"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Subscription Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className={`relative p-8 rounded-3xl w-full max-w-lg shadow-2xl ${
                isDarkMode
                  ? "bg-gray-900/80 border border-gray-700 text-white"
                  : "bg-white/70 border border-gray-200 text-gray-900 backdrop-blur-xl"
              }`}
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Join Our Newsletter</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-red-500 outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                >
                  <option value="daily">Daily Updates</option>
                  <option value="weekly">Weekly Digest</option>
                </select>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="AI">Artificial Intelligence</option>
                </select>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-500 text-white hover:opacity-90 transition"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CallToAction;
