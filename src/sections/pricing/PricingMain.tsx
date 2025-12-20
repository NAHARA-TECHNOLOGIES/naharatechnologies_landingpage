"use client";

import TierCard from "@/components/TierCard";
import pricingData, { getTitles } from "@/constants/pricing";
import React, { useState } from "react";

const PricingMain = () => {
  const [service, setService] =
    useState<keyof typeof pricingData>("digitalMarketing");
  const displayData = pricingData[service];

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

        <div className="w-full sticky top-[65px] z-40 py-4 px-4 overflow-hidden">
          <div className="flex gap-3 overflow-x-auto no-scrollbar justify-start w-full max-w-[1280px] mx-auto">
            {getTitles().map((title) => (
              <button
                key={title.key}
                className={`price-nav_btn ${
                  title.key === service
                    ? "btn-primary"
                    : "hover:border-brandRed hover:text-brandRed"
                }`}
                onClick={() => setService(title.key)}
              >
                {title.title.replace(" and ", " & ")}
              </button>
            ))}
          </div>
        </div>

        <div className="my-10">
          <section>
            <div className="flex items-center gap-4">
              <div className="size-10 shrink-0 rounded-full bg-brandRed backdrop-blur-lg flex items-center justify-center">
                <displayData.icon className="text-white size-6" />
              </div>

              <h2 className="text-[clamp(20px,2vw,28px)] font-semibold">
                {displayData.title}
              </h2>
            </div>

            <div className="py-3 px-2 md:px-6 mt-3">
              {displayData.description && <p>{displayData.description}</p>}

              <div className="mt-6 space-y-12">
                {"categories" in displayData && (
                  <>
                    {displayData.categories?.map((category) => (
                      <div key={category.name}>
                        <h3 className="text-h3">{category.name}</h3>

                        {category.subcategories ? (
                          category.subcategories.map((sub) => (
                            <div key={sub.name} className="mt-6">
                              <h4 className="text-lg font-semibold">
                                {sub.name}
                              </h4>
                              <div className="grid md:grid-cols-3 gap-6 mt-4">
                                {sub.tiers.map((tier) => (
                                  <TierCard key={tier.name} tier={tier} />
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="grid md:grid-cols-3 gap-6 mt-6">
                            {category.tiers && category.tiers.map((tier) => (
                              <TierCard key={tier.name} tier={tier} />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}

                {"tiers" in displayData && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                      {displayData.tiers.map((tier) => (
                        <TierCard key={tier.name} tier={tier} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PricingMain;
