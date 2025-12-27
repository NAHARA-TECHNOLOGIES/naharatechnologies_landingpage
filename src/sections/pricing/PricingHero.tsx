import React from "react";

const PricingHero = () => {
  return (
    <section
      className="relative min-h-[70vh] w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/020efcc2-39fa-4397-a8b1-657fce73285a-naharatechnologies-com/assets/images/hero-section-bg-29.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 text-center text-white px-4 py-20 max-w-4xl mx-auto">
        <span className="inline-block px-4 py-1 rounded-full text-bodySmall bg-white/10 backdrop-blur-sm text-white tracking-wide uppercase mb-6 border border-white/20">
          Pricing
        </span>

        <div className="my-8">
          <h1 className="text-h1 leading-tight mb-6">
            Transparent Pricing for Every Stage
          </h1>
          <p className="text-bodyLarge text-white/90 max-w-2xl mx-auto leading-relaxed">
            Designed to fit startups, growing businesses, and established
            brands. All projects can be customized based on your scope and
            timeline.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="#pricing"
            className="bg-[#C41E3A] hover:bg-[#B91C1C] px-6 md:px-8 py-3 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg"
          >
            View All Pricing
          </a>
          <a
            href="#contact"
            className="border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 md:px-8 rounded-full font-bold transition-all duration-300"
          >
            Get Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;
