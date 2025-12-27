"use client";

import pricingData, {
  Category,
  SubCategory,
  Tier,
  CategorizedService,
} from "@/constants/pricing";
import React, { Key, useState } from "react";
import TierCard from "./TierCard";
import Selection from "./Selection";

function PricingBoard<K extends keyof typeof pricingData>({
  title,
}: {
  title: K;
}) {
  const [selected, setSelected] = useState(0);
  const data = pricingData[title] as (typeof pricingData)[K];
  const Icon = data.icon;

  const displayItems = () => {
    switch (title) {
      case "branding": {
        const categorized = data as CategorizedService;

        return (
          <div className="mt-6">
            <Selection
              selections={categorized.categories.map(
                (item: Category) => item.name
              )}
              displaySelections={(selections) => {
                return selections?.map((selection, idx) => (
                  <button
                    key={selection as Key}
                    className={`price-nav_btn ${
                      idx === selected
                        ? "btn-primary"
                        : "hover:border-brandRed hover:text-brandRed"
                    }`}
                    onClick={() => setSelected(idx)}
                  >
                    {selection as string}
                  </button>
                ));
              }}
            />

            <>
              {categorized.categories[selected].subcategories ? (
                categorized.categories[selected].subcategories.map(
                  (sub: SubCategory) => (
                    <div key={sub.name} className="mt-6">
                      <h4 className="text-lg font-semibold">{sub.name}</h4>
                      <div className="grid md:grid-cols-3 gap-6 mt-4">
                        {sub.tiers.map((tier: Tier) => (
                          <TierCard key={tier.name} tier={tier} />
                        ))}
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  {categorized.categories[selected].tiers &&
                    categorized.categories[selected].tiers.map((tier) => (
                      <TierCard key={tier.name} tier={tier} />
                    ))}
                </div>
              )}
            </>
          </div>
        );
      }
      case "pdaas":
        return (
          <div className="mt-6 grid gap-3">
            {"features" in data &&
              data.features.map((feature) => (
                <div
                  key={feature}
                  className="
                    relative
                    rounded-[14px]
                    bg-white/30
                    backdrop-blur-xl
                    border border-white/40
                    px-4 py-3 pl-5
                    shadow-[0_12px_24px_rgba(0,0,0,0.1)]
                  "
                >
                  {/* accent line */}
                  <span className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-[#B93838]/60" />
        
                  <p className="text-sm text-[#5A1A1A]">
                    {feature}
                  </p>
                </div>
              ))}
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
}

export default PricingBoard;
