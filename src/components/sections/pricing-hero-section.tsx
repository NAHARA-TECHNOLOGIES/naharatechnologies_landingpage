import React from 'react';

export default function PricingHeroSection() {
  return (
    <section 
      className="relative h-screen w-full bg-cover bg-center animate-hero-bg"
      style={{
        backgroundImage: "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/020efcc2-39fa-4397-a8b1-657fce73285a-naharatechnologies-com/assets/images/hero-section-bg-29.png')"
      }}
    >
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-8xl font-bold">Pricing Plans Tailored for You</h1>
        <p className="mt-4 text-lg max-w-xl">
          Empower your business to thrive with innovative software solutions and flexible plans designed to scale with your growth. Simple, transparent pricing for every stage.
        </p>
        <div className="mt-6 flex gap-4">
          <button className="bg-red-800 px-6 py-2 rounded hover:bg-red-700 transition font-semibold">
            View Plans
          </button>
          <button className="px-6 py-2 border border-white text-white bg-transparent hover:bg-white hover:text-black transition duration-300 rounded font-semibold">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}