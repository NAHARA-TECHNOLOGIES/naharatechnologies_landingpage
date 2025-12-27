"use client";

import PricingBoard from "@/components/PricingBoard";
import Selection from "@/components/Selection";
import TierCard from "@/components/TierCard";
import pricingData from "@/constants/pricing";
import React, { useState } from "react";

const PricingMain = () => {
  const [selected, setSelected] = useState("branding");

  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-bodyXS bg-red-100 text-[#C41E3A] tracking-wide uppercase mb-4">
            Our Services
          </span>

          <h2 className="text-h2 text-gray-900 mb-6">
            Choose What Works for You
          </h2>

          <p className="text-bodyLarge text-gray-600 max-w-2xl mx-auto">
            Click on any service category to explore detailed pricing options
            tailored to your needs.
          </p>
        </div>

        <Selection
          selections={[
            { key: "branding", title: "Branding & Creative" },
            { key: "digital", title: "Digital Marketing" },
            { key: "consult", title: "Consulting & Strategy" },
            { key: "software", title: "Software Development" },
            { key: "cloud", title: "Cloud & Infrastructure" },
            { key: "hosting", title: "Hosting & Domain Services" },
            { key: "business", title: "Business Support & Digital Setup" },
            { key: "pdaas", title: "pDaaS" },
          ]}
          displaySelections={(selections) => {
            return selections?.map((selection) => {
              if (typeof selection === "string") {
                return null;
              }

              return (
                <button
                  key={selection.key}
                  className={`price-nav_btn ${
                    selection.key === selected
                      ? "btn-primary"
                      : "hover:border-brandRed hover:text-brandRed bg-white"
                  }`}
                  onClick={() => setSelected(selection.key)}
                >
                  {selection.title}
                </button>
              );
            });
          }}
        />

        <PricingBoard title={selected as keyof typeof pricingData} />
      </div>
    </section>
  );
};

export default PricingMain;
