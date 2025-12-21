"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/kosi.jpg"

const testimonials = [
  {
    quote:
      "Nahara has been amazing to work with.They handle everything for my startup business, while I focus on other things. They listen,guide and make progress feel effortless.",
    name: "Sam",
    role: "Founder, Psallm Digitals",
    image: avatar1,
  },
  {
    quote:
      "Working with Nahara was a turning point for our business. Their attention to detail, communication, and technical expertise helped us launch with confidence and clarity.",
    name: "Ifeanyi",
    role: "Founder, Ekemart",
    image: avatar3,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-28 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-bodySmall uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Testimonials
          </p>

          <h2 className="text-h2 mt-4 text-darkText dark:text-white">
            Trusted by founders and growing teams
          </h2>

          <p className="mt-4 text-bodyDefault text-gray-600 dark:text-gray-300 leading-relaxed">
          From a spark of an idea to a fully launched product, we have partnered with businesses and founders across Africa and beyond helping them bring their vision to life and achieve real impact.


          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl bg-gray-50 dark:bg-gray-800 p-10 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              {/* Quote */}
              <p className="text-bodyLarge leading-relaxed text-gray-700 dark:text-gray-200">
                “{item.quote}”
              </p>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4">
                {/* <Image
                  src={item.image}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                /> */}

                <div>
                  <p className="text-bodyDefault font-semibold text-darkText dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-bodySmall text-gray-500 dark:text-gray-400">
                    {item.role}
                  </p>
                </div>
              </div>

              {/* Subtle Accent */}
              <span className="absolute top-6 right-6 text-6xl text-gray-200 dark:text-gray-700 font-serif leading-none">
                “
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
