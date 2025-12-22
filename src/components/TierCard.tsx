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
  <div className="flex flex-col p-8 rounded-3xl bg-brandRed border border-[#254632] hover:border-brandRed/50 transition-all overflow-hidden group relative">
    {tier.popular && (
      <div className="absolute top-0 right-0 bg-white text-background-dark text-xs font-bold px-3 py-1 rounded-bl-xl">
        POPULAR
      </div>
    )}

    <div className="mb-4">
      <h3 className="text-xl font-bold text-white">{tier.name}</h3>
      {tier.ideal && (
        <p className="text-text-secondary text-sm mt-2 min-h-[40px]">
          {tier.ideal}
        </p>
      )}
    </div>

    <div className="mb-6">
      <span className="text-sm font-bold text-white">{tier.price}</span>
    </div>

    <ul className="flex-1 space-y-2 mb-8 max-h-64 overflow-y-auto no-scrollbar">
      {tier.features.map((feat) => (
        <li key={feat} className="flex gap-3 text-sm text-white">
          <CheckCircle className="size-[14px] shrink-0" />
          {feat}
        </li>
      ))}
    </ul>

    <button className="w-full h-12 rounded-full bg-border-dark text-white font-bold hover:bg-primary transition-colors">
      Start Project
    </button>
  </div>
);

export default TierCard;
