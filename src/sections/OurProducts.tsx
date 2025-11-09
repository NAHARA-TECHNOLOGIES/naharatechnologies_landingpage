"use client";

import { motion } from "framer-motion";
import { FaLaptopCode, FaChartLine, FaMobileAlt } from "react-icons/fa";

const products = [
  {
    title: "Web Development",
    description:
      "We build scalable, SEO-friendly, and responsive websites tailored for performance and modern user experience.",
    icon: <FaLaptopCode className="text-5xl text-white" />,
    gradient: "from-red-800 via-gray-700 to-red-500", 
  },
  {
    title: "Digital Marketing",
    description:
      "Our marketing team ensures your brand gets the attention it deserves through targeted campaigns and analytics.",
    icon: <FaChartLine className="text-5xl text-gray-900 dark:text-gray-100" />,
    gradient: "", 
  },
  {
    title: "Mobile Apps",
    description:
      "Launch Android & iOS apps with clean design, smooth performance, and seamless cross-platform integration.",
    icon: <FaMobileAlt className="text-5xl text-white" />,
    gradient: "from-red-800 via-gray-700 to-red-500", 
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, type: "spring", stiffness: 120 },
  }),
};

export const OurProducts = () => {
  return (
    <section className="py-28 from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
       <motion.h2
      className="text-4xl sm:text-5xl lg:text-6xl font-extrabold 
                bg-clip-text text-transparent mb-8
                bg-gradient-to-r 
                from-gray-900 via-gray-800 to-gray-700 
                dark:from-white dark:via-gray-300 dark:to-gray-500"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Our Services
    </motion.h2>

        <p className="text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
          Transform your ideas into reality with our full-stack solutions, digital marketing 
          strategies, and mobile apps. Plus, get a free consultation to kickstart your project.
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              className={`group relative p-8 rounded-3xl shadow-2xl transition-transform cursor-pointer
                ${product.gradient ? `bg-gradient-to-r ${product.gradient} animate-gradient` : 'bg-white dark:bg-gray-900'}
                bg-clip-padding backdrop-blur-md border border-transparent hover:border-white/30`}
            >
              <motion.div
                className="mb-6 flex justify-center"
                whileHover={{ rotate: [0, 5, -5, 0] }}
              >
                {product.icon}
              </motion.div>
              <h3 className={`text-xl font-semibold mb-2 ${product.gradient ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {product.title}
              </h3>
              <p className={product.gradient ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}>
                {product.description}
              </p>
            </motion.div>
          ))}
        </div>
    <motion.a
      href="https://wa.me/2349078781812"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-16 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-red-800 via-gray-500 to-red-500 shadow-lg hover:scale-105 transition-transform"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      Get Free Consultation
    </motion.a>

      </div>

     <div className="absolute top-0 left-1/2 w-[400px] h-[400px] bg-pink-300/20 rounded-full filter blur-3xl -translate-x-1/2 animate-float-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-400/20 rounded-full filter blur-3xl animate-float-slower"></div>
    </section>
  );
};
