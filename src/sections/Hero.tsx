"use client";

import { useState } from "react";
import { MdBuild } from "react-icons/md"; // 👈 Maintenance icon

export const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      className="relative h-screen w-full bg-cover bg-center animate-hero-bg"
      style={{ backgroundImage: `url('/hero-section-bg.png')` }}
    >
      <div className="absolute inset-0 bg-black/70 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-8xl font-bold">Sparking Your Vision</h1>
        <p className="mt-4 text-lg max-w-xl">
          Empower your business to thrive with innovative software solutions,
          smart branding strategies, and flexible pay-as-you-go plans that make
          growth effortless and affordable.
        </p>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-800 px-6 py-2 rounded hover:bg-red-700 transition"
          >
            See Pricing
          </button>
          <button className="px-6 py-2 border border-white text-white bg-transparent hover:bg-white hover:text-black transition duration-300 rounded">
            Learn More
          </button>
        </div>
      </div>

      {/* 👇 Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6 text-center shadow-lg">
            <MdBuild className="mx-auto mb-4 text-yellow-500 text-6xl" />
            <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
              Page Under Maintenance
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Our pricing page is currently being updated. For quicker assistance, please use the Quick Chat button or visit our <a href="/help" className="text-blue-600 underline">Help page</a>.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
