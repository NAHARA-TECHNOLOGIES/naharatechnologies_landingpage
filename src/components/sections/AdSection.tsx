"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Ad = {
  id: string;
  title: string;
  imageUrl: string;
  views: number;
};

const AdSection = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    import("@/mock/ads").then((mod) => setAds(mod.ads || []));
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad) => (
        <div
          key={ad.id}
          className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <Image
            src={ad.imageUrl}
            alt={ad.title}
            width={400}
            height={250}
            className="w-full h-auto object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{ad.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {ad.views} views
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AdSection;
