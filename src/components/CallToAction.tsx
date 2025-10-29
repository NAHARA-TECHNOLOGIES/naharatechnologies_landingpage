"use client";

import React, { useEffect, useState } from "react";
<<<<<<< Updated upstream
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

=======
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Image from "next/image";
import SubImage from "@/assets/SubIm.png";

>>>>>>> Stashed changes
const CallToAction = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const dark =
      root.classList.contains("dark") || localStorage.getItem("theme") === "dark";
    setIsDarkMode(dark);
  }, []);

<<<<<<< Updated upstream
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
=======
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Subscribed successfully!");
    setShowModal(false);
    setFormData({ email: "", frequency: "weekly", category: "Technology" });
  };

  // Motion variants
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <section
      className={`relative overflow-hidden mx-auto max-w-7xl rounded-[2rem] my-20 px-6 sm:px-10 md:px-14 lg:px-20 py-16 md:py-24 transition-all duration-700 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-red-600 via-rose-500 to-orange-400"
      }`}
    >
      <div className="absolute -top-32 -left-20 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-red-400/30 blur-3xl rounded-full animate-pulse" />
      <div className="absolute -bottom-40 -right-24 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-yellow-300/30 blur-3xl rounded-full animate-pulse delay-700" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center text-center lg:text-left">
        <motion.div
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6 px-2"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
            Stay Ahead with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-800 via-red-300 to-orange-200">
              Nahara Technologies
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl max-w-lg mx-auto lg:mx-0 text-white/90">
            Get innovation updates, insights, and product releases from Nahara’s
            tech ecosystem — crafted for dream builders like you.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 px-8 py-4 text-lg font-semibold rounded-full bg-white text-red-700 hover:bg-gray-100 transition-transform transform hover:scale-110 hover:-translate-y-1 shadow-lg"
            >
              Subscribe Now
            </button>
          </motion.div>
        </motion.div>

        {/* Right Section (Image) */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center lg:justify-end w-full"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative w-[90%] sm:w-[80%] md:w-[70%] lg:w-[85%]"
          >
            <Image
              src={SubImage}
              alt="Newsletter Illustration"
              className="rounded-3xl shadow-2xl object-contain w-full h-auto"
              priority
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`w-full max-w-md rounded-2xl p-6 shadow-2xl ${
                isDarkMode
                  ? "bg-gray-900/90 text-white border border-gray-700"
                  : "bg-white/90 text-gray-900 border border-gray-200 backdrop-blur-xl"
              }`}
            >
              <h3 className="text-2xl font-bold mb-6 text-center">
                Join Our Newsletter
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-red-500 outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                    value={formData.frequency}
                    onChange={(e) =>
                      setFormData({ ...formData, frequency: e.target.value })
                    }
                  >
                    <option value="daily">Daily Updates</option>
                    <option value="weekly">Weekly Digest</option>
                  </select>

                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="AI">Artificial Intelligence</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-500 text-white hover:opacity-90 transition"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
>>>>>>> Stashed changes
    </section>
  );
};

export default CallToAction;
