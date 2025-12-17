"use client";

import Link from "next/link";
import { useState } from "react";
import { MdBuild } from "react-icons/md"; // 👈 Maintenance icon

export const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="overflow-hidden">
      <section
        className="relative h-screen w-full bg-cover bg-center animate-hero-bg"
        style={{ backgroundImage: `url('/hero-section-bg.png')` }}
      >
        <div className="absolute inset-0 bg-black/70 z-0" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-h1">
            Building African Brilliance, One Innovation at a Time
          </h1>
          <p className="mt-4 text-bodyLarge max-w-xl leading-relaxed">
            Empower your business with modern software, intelligent branding,
            and flexible pay-as-you-go solutions designed for growth.
          </p>
          <div className="mt-6 flex gap-4">
    
            <Link href="/pricing" className="bg-brandRed hover:bg-[#B91C1C] px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg">Unlock Your Best Option</Link>
          
          </div>
        </div>

        {/* 👇 Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6 text-center shadow-lg">
              <MdBuild className="mx-auto mb-4 text-yellow-500 text-6xl" />
              <h2 className="font-semibold text-darkText dark:text-white mb-2">
                Page Under Maintenance
              </h2>
              <p className="text-bodySmall text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Our pricing page is currently being updated. For quicker
                assistance, please use the Quick Chat button or visit our{" "}
                <a href="/help" className="text-blue-600 underline">
                  Help page
                </a>
                .
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-2 px-4 py-2 bg-brandRed text-primaryButton rounded hover:opacity-90 transition font-bold text-bodyDefault"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
