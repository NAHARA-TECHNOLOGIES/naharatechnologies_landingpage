"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does the installmental payment plan work?",
    answer:
      "We understand that funding can be a challenge for growing businesses. Our flexible pay-as-you-go plans allow you to kickstart your project with an initial deposit, followed by manageable monthly installments as we reach key project milestones. This ensures you can bring your vision to life without breaking the bank.",
  },
  {
    question: "What services are included in the branding package?",
    answer:
      "Our comprehensive branding package includes logo design, color palette development, typography selection, and brand guidelines. We also offer extended services like business card design, social media kits, and brand voice strategy to ensure your identity is consistent across all touchpoints.",
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer:
      "Yes, we provide dedicated support and maintenance packages tailored to your needs. This includes security updates, bug fixes, performance monitoring, and content updates to ensure your software or website remains up-to-date and performs optimally long after launch.",
  },
  {
    question: "How long does a typical project take to complete?",
    answer:
      "Project timelines vary based on complexity and scope. A standard corporate website typically takes 2-4 weeks, while a custom mobile app or complex web platform may take 3-6 months. We provide a detailed project timeline and roadmap during our initial consultation.",
  },
  {
    question: "Can I upgrade my service plan later?",
    answer:
      "Absolutely. We build our solutions with scalability in mind. Whether you need to add new features to your app, expand your marketing campaign, or enhance your website's functionality, we can seamlessly upgrade your plan to accommodate your business growth.",
  },
];

export default function PricingFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-white via-[#fff0ef] to-[#feecea]">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-red-100/50 blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-pink-100/40 blur-3xl opacity-60 pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-semibold bg-red-100 text-red-700 tracking-wide uppercase">
            Start Your Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our services, pricing plans, and how
            we can help you spark your vision.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                onClick={() => toggleAccordion(index)}
                className={`group rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm
                  ${
                    isOpen
                      ? "bg-white border-[#c41e3a]/30 shadow-lg ring-1 ring-[#c41e3a]/10"
                      : "bg-white/60 border-gray-200 hover:bg-white hover:border-red-200 shadow-sm hover:shadow-md"
                  }`}
              >
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                      isOpen ? "text-[#c41e3a]" : "text-gray-900 group-hover:text-[#c41e3a]"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 ml-4 p-1 rounded-full transition-all duration-300 ${
                      isOpen
                        ? "bg-[#c41e3a] text-white rotate-180"
                        : "bg-red-50 text-[#c41e3a] group-hover:bg-[#c41e3a] group-hover:text-white"
                    }`}
                  >
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-600 text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Still have questions? We&apos;re
            happy to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white transition-transform duration-300 bg-red-800 rounded-full hover:bg-red-700 hover:scale-105 shadow-lg shadow-red-900/20"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
