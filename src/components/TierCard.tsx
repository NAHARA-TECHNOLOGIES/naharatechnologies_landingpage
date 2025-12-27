import { CheckCircle } from "lucide-react";

const TierCard = ({
  tier,
}: {
  tier: {
    name: string;
    price: string;
    features: string[];
    ideal?: string;
    popular?: boolean;
  };
}) => (
  <div
    className={` relative flex flex-col rounded-[22px] p-8 bg-white/30 backdrop-blur-2xl border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5 ${
      tier.popular &&
      "bg-white/40 border-white/50 shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
    }`}
  >
    {/* POPULAR badge */}
    {tier.popular && (
      <span className="absolute -top-3 right-6 rounded-full bg-[#F2B6B6] px-3 py-1 text-xs font-semibold text-[#6E1F1F]">
        POPULAR
      </span>
    )}

    {/* Header */}
    <div className="mb-4">
      <h3 className="text-xl font-bold text-[#5A1A1A]">{tier.name}</h3>

      {tier.ideal && (
        <p className="text-sm text-[#7A3A3A] mt-2 min-h-[40px]">{tier.ideal}</p>
      )}
    </div>

    {/* Price */}
    <div className="mb-6">
      <span className="text-2xl font-bold text-[#5A1A1A]">{tier.price}</span>
    </div>

    {/* Features */}
    <ul className="flex-1 space-y-3 mb-8 text-sm text-[#6B2A2A]">
      {tier.features.map((feat) => (
        <li key={feat} className="flex gap-3">
          <CheckCircle className="size-[14px] shrink-0 text-[#B93838]" />
          {feat}
        </li>
      ))}
    </ul>

    {/* Button */}
    <button
      className={
        tier.popular
          ? "w-full rounded-full bg-[#B93838] py-3 text-sm font-semibold text-white shadow-lg shadow-[#B93838]/30 hover:bg-[#C94747] transition"
          : "w-full rounded-full bg-white/20 py-3 text-sm font-medium text-[#5A1A1A] hover:bg-white/30 transition"
      }
    >
      Start Project
    </button>
  </div>
);

export default TierCard;
