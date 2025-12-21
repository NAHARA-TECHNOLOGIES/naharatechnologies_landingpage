"use client";

import pricingData from "@/constants/pricing";
import React, { useState } from "react";
import TierCard from "./TierCard";
import Selection from "./Selection";

const PricingBoard = ({ title }: { title: string }) => {
  const [selected, setSelected] = useState(0);
  const data = pricingData[title];
  const Icon = data.icon;

  const displayItems = () => {
    switch (title) {
      case "branding":
        return (
          <div className="mt-6">
            <Selection
              selections={data.categories.map((item) => item.name)}
              displaySelections={(selections) => {
                return selections?.map((selection, idx) => (
                  <button
                    key={selection}
                    className={`price-nav_btn ${
                      idx === selected
                        ? "btn-primary"
                        : "hover:border-brandRed hover:text-brandRed"
                    }`}
                    onClick={() => setSelected(idx)}
                  >
                    {selection}
                  </button>
                ));
              }}
            />

            <>
              {data.categories[selected].subcategories ? (
                data.categories[selected].subcategories.map((sub) => (
                  <div key={sub.name} className="mt-6">
                    <h4 className="text-lg font-semibold">{sub.name}</h4>
                    <div className="grid md:grid-cols-3 gap-6 mt-4">
                      {sub.tiers.map((tier) => (
                        <TierCard key={tier.name} tier={tier} />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  {data.categories[selected].tiers &&
                    data.categories[selected].tiers.map((tier) => (
                      <TierCard key={tier.name} tier={tier} />
                    ))}
                </div>
              )}
            </>
          </div>
        );
      default:
        return (
          <div className="mt-6">
            {"tiers" in data && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {data.tiers.map((tier) => (
                  <TierCard key={tier.name} tier={tier} />
                ))}
              </div>
            )}
          </div>
        );
    }
  };
  return (
    <div className="my-10">
      <section>
        <div className="flex items-center gap-4">
          <div className="size-10 shrink-0 rounded-full bg-brandRed backdrop-blur-lg flex items-center justify-center">
            <Icon className="text-white size-6" />
          </div>

          <h2 className="text-[clamp(20px,2vw,28px)] font-semibold">
            {data.title}
          </h2>
        </div>

        <div className="py-3 px-2 md:px-6 mt-3">
          {data.description && <p>{data.description}</p>}
          {displayItems()}
        </div>
      </section>
    </div>
  );
};

export default PricingBoard;
