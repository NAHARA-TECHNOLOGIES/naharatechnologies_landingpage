"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Image from "next/image";
import SubImage from "@/assets/SubIm.png"

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

  const handleSubmit = (e: React.FormEvent) => {
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
    <section className={`relative overflow-hidden rounded-3xl shadow-2xl my-16 sm:my-24 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-12 text-white transition-colors duration-700 ${isDarkMode ? "dark-gradient" : "light-gradient"}`}>
      <div className="absolute inset-0 animate-gradient-move bg-gradient-to-r from-red-500 via-red-700 to-gray-800 opacity-80 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px] opacity-10" />

      {/* Content + Image */}
      <div className="relative z-10 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 text-center lg:text-left">
        {/* Text Section */}
        <div>
          <MotionH2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Stay Ahead of the Curve with <span className="text-red-300">Nahara Technologies Updates</span>
          </MotionH2>

          <MotionP initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }} className={`mt-5 text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 px-2 ${isDarkMode ? "text-gray-300" : "text-white/90"}`}>
            Join our newsletter for exclusive insights, innovations, and product updates from Nahara Tech.
          </MotionP>

          <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }} className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6 px-4">
            <button onClick={() => setShowModal(true)} className={`inline-block rounded-full font-semibold text-base sm:text-lg px-8 py-3 sm:px-10 sm:py-4 shadow-md transition-transform hover:scale-105 ${isDarkMode ? "bg-white text-indigo-800 hover:bg-gray-200" : "bg-red-900 text-white hover:bg-red-200"}`}>
              Subscribe Now
            </button>
          </MotionDiv>
        </div>

        {/* Animated Image Section */}
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="w-full flex justify-center lg:justify-end">
          <Image
            src={SubImage}
            alt="Happy person subscribing to newsletter"
            width={500}
            height={500}
            className="rounded-xl object-contain max-w-full h-auto"
            priority
          />
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
              <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" required placeholder="Your email" className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                <select className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" value={formData.frequency} onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}>
                  <option value="daily">Daily Updates</option>
                  <option value="weekly">Weekly Digest</option>
                </select>

                <select className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="AI">Artificial Intelligence</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
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
