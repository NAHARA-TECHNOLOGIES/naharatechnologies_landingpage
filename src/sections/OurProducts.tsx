"use client";

import { motion } from "framer-motion";
import { FaLaptopCode, FaChartLine, FaMobileAlt } from "react-icons/fa";

const products = [
  {
    title: "Web Development",
    description:
      "We build scalable, SEO-friendly, and responsive websites tailored for performance and modern user experience.",
    icon: <FaLaptopCode className="text-4xl text-blue-600" />,
  },
  {
    title: "Digital Marketing",
    description:
      "Our marketing team ensures your brand gets the attention it deserves through targeted campaigns and analytics.",
    icon: <FaChartLine className="text-4xl text-green-600" />,
  },
  {
    title: "Mobile Apps",
    description:
      "Launch Android & iOS apps with clean design, smooth performance, and seamless cross-platform integration.",
    icon: <FaMobileAlt className="text-4xl text-purple-600" />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

export const OurProducts = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">


        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="bg-white  dark:bg-gray-900 border border-white 
              dark:border-black
              p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 flex justify-center ">{product.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-2  dark:text-white">{product.title}</h3>
              <p className="text-gray-600 text-center dark:text-white">{product.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
