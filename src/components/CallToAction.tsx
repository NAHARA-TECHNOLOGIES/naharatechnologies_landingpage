"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Image from "next/image";
import SubImage from "@/assets/SubIm.png";

const CallToAction = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    frequency: "weekly",
    category: "Technology",
  });

  useEffect(() => {
    const root = document.documentElement;
    const dark =
      root.classList.contains("dark") || localStorage.getItem("theme") === "dark";
    setIsDarkMode(dark);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email.includes("@")) {
      return toast.error("Please enter a valid email.");
    }

    setLoading(true);

    try {
      // Use absolute path to avoid routing issues
      const res = await fetch(`${window.location.origin}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Subscription failed");
      } else {
        toast.success(data.message || "Subscribed successfully!");
        setShowModal(false);
        setFormData({ email: "", frequency: "weekly", category: "Technology" });
      }
    } catch (err) {
      console.error("Subscription error:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
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
              className="mt-6 px-8 py-4 text-lg font-semibold rounded-full bg-white text-red-700
               hover:bg-gray-100 transition-transform transform hover:scale-110 hover:-translate-y-1 shadow-lg"
            >
              Subscribe Now
            </button>
          </motion.div>
        </motion.div>

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
              <h3 className="text-2xl font-bold mb-6 text-center">Join Our Newsletter</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-red-500 outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 dark:border-gray-700 bg-transparent"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    disabled={loading}
                  >
                    <option value="daily">Daily Updates</option>
                    <option value="weekly">Weekly Digest</option>
                  </select>

                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 dark:border-gray-700 bg-transparent"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    disabled={loading}
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
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-500 text-white hover:opacity-90 transition"
                    disabled={loading}
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
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
