import { faqs } from "@/constants";
import { useState } from "react";
import { BiUpArrow } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion"; // For smooth animations

const HelpFAQ = () => {
  const [_faqs, setFaqs] = useState(faqs);

  const toggleAnswer = (question: string) => {
    setFaqs((prev) =>
      prev.map((faq) =>
        faq.question === question ? { ...faq, isShowing: !faq.isShowing } : faq
      )
    );
  };

  return (
    <section className="p-6 py-12 md:py-20 lg:px-[183px] bg-white">
      <h2 className="text-h2 text-center max-w-[700px] mx-auto font-semibold">
        Frequently Asked Questions About Nahara Technologies
      </h2>

      <div className="mt-16 md:flex gap-12">
        {/* Left illustration or image */}
        <div className="hidden md:block w-full md:w-1/2 min-h-[400px] lg:h-[450px] rounded-[12px] help-faq-bg shadow-lg" />

        {/* FAQ list */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {_faqs.map(({ question, answer, isShowing }, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="flex justify-between items-center cursor-pointer p-5"
                onClick={() => toggleAnswer(question)}
              >
                <p className="text-bodyLarge text-black font-medium">{question}</p>
                <BiUpArrow
                  className={`ml-4 transition-transform duration-300 ${
                    isShowing ? "rotate-180 text-nahara-primary" : ""
                  }`}
                  size={20}
                />
              </div>

              <AnimatePresence>
                {isShowing && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-gray-700 text-body"
                  >
                    {answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpFAQ;
