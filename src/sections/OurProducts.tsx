"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FaPalette,
  FaChartLine,
  FaLightbulb,
  FaLaptopCode,
  FaCloud,
  FaGlobe,
  FaBriefcase,
  FaLayerGroup,
} from "react-icons/fa";

const products = [
  {
    title: "Branding & Creative",
    description:
      "We help you shape a brand that feels true to who you are clear, modern, and memorable. From identity design to UI/UX and corporate visuals, we bring your story to life with creativity that stands out.",
    icon: <FaPalette className="text-5xl text-white" />,
    gradient: "from-red-800 via-gray-700 to-red-500",
  },
  {
    title: "Digital Marketing",
    description:
      "We grow your online presence with smart, targeted marketing. From social media to SEO and paid ads, we make sure the right people see, trust, and choose your brand.",
    icon: <FaChartLine className="text-5xl text-gray-900 dark:text-gray-100" />,
    gradient: "",
  },
  {
    title: "Consulting & Strategy",
    description:
      "We guide you with practical strategies that strengthen your business. Whether you're entering a new market, shaping a product idea, or planning growth, we help you move with clarity and confidence.",
    icon: <FaLightbulb className="text-5xl text-white" />,
    gradient: "from-red-800 via-gray-700 to-red-500",
  },
  {
    title: "Software Development",
    description:
      "We build the software your business needs fast, reliable, and easy to use. From websites to enterprise systems and custom apps, our team handles everything from idea to deployment.",
    icon: (
      <FaLaptopCode className="text-5xl text-gray-900 dark:text-gray-100" />
    ),
    gradient: "",
  },
  {
    title: "Cloud & Infrastructure",
    description:
      "We keep your systems running smoothly with secure, scalable cloud solutions. From hosting to DevOps and CI/CD pipelines, we ensure performance, reliability, and peace of mind.We keep your systems running smoothly with secure, scalable cloud solutions and DevOps support.",
    icon: <FaCloud className="text-5xl text-white" />,
    gradient: "from-red-800 via-gray-700 to-red-500",
  },
  {
    title: "Hosting & Domain Services",
    description:
      "We make it simple for your business to go online. Get secure hosting, domain support, and all the essentials you need to stay visible and protected on the web.",
    icon: <FaGlobe className="text-5xl text-gray-900 dark:text-gray-100" />,
    gradient: "",
  },
  {
    title: "Business Support & Digital Setup",
    description:
      "We help you set up everything you need to operate confidently from your digital presence to business documents, company profiles, and online launch support.",
    icon: <FaBriefcase className="text-5xl text-white" />,
    gradient: "from-red-800 via-gray-700 to-red-500",
  },
  {
    title: "Product Development as a Service (PDaaS)",
    description:
      "We become your full product team designing, building, and managing your digital product from start to finish. Perfect for founders and businesses who want expert execution without the stress of hiring or managing a tech team.",
    icon: (
      <FaLayerGroup className="text-5xl text-gray-900 dark:text-gray-100" />
    ),
    gradient: "",
  },
];

const CARD_WIDTH = 400; // controls spacing & indicator jumps

export const OurProducts = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  // Auto scroll
  useEffect(() => {
    if (isInteracting) return;

    controls.start({
      x: [0, -(products.length * CARD_WIDTH)],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 45,
        ease: "linear",
      },
    });
  }, [controls, isInteracting]);

  const scrollToIndex = (index: number) => {
    setIsInteracting(true);
    setActiveIndex(index);

    controls.start({
      x: -(index * CARD_WIDTH),
      transition: { duration: 0.8, ease: "easeInOut" },
    });
  };

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-h2 mb-6">Our Services</h2>

        <p className="text-bodyDefault text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto leading-relaxed">
          We help you bring your ideas to life with full-stack development,
          strategic digital marketing, and beautifully built mobile apps.
          Everything we create is designed to help your business grow with
          confidence. And if you are ready to begin, a free consultation is the
          perfect first step.
        </p>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            ref={containerRef}
            drag="x"
            dragConstraints={{ left: -products.length * CARD_WIDTH, right: 0 }}
            onDragStart={() => setIsInteracting(true)}
            onDragEnd={() => setIsInteracting(false)}
            animate={controls}
            className="flex gap-10 cursor-grab active:cursor-grabbing"
          >
            {products.map((product, index) => (
              <div
                key={index}
                className={`min-w-[320px] md:min-w-[360px] lg:min-w-[380px]
                p-8 rounded-3xl shadow-2xl
                ${
                  product.gradient
                    ? `bg-gradient-to-r ${product.gradient}`
                    : "bg-white dark:bg-gray-900"
                }`}
              >
                <div className="mb-6 flex justify-center">{product.icon}</div>

                <h3
                  className={`text-h3 mb-3 ${
                    product.gradient
                      ? "text-white"
                      : "text-darkText dark:text-white"
                  }`}
                >
                  {product.title}
                </h3>

                <p
                  className={`text-bodySmall ${
                    product.gradient
                      ? "text-white/90 leading-relaxed"
                      : "text-gray-700 dark:text-gray-300 leading-relaxed"
                  }`}
                >
                  {product.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-10">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeIndex === index
                  ? "bg-red-600 scale-125"
                  : "bg-gray-400 hover:bg-gray-600"
              }`}
              aria-label={`View service ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://wa.me/2349078781812"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-16 px-8 py-4 rounded-full text-white bg-gradient-to-r from-red-800 via-gray-500 to-red-500 shadow-lg hover:scale-105 transition-transform font-semibold"
        >
          Get Free Consultation
        </a>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 w-[400px] h-[400px] bg-pink-300/20 blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-400/20 blur-3xl" />
    </section>
  );
};
