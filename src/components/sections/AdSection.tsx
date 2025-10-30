"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FC } from "react";

type Ad = {
  id: string;
  title: string;
  imageUrl: string;
  views: number;
};

const AdCard: FC<{ ad: Ad; onView: (id: string) => void }> = ({ ad, onView }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onView(ad.id);
            if (el) obs.unobserve(el);
          }
        });
      },
      { threshold: 0.6 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ad.id, onView]);

  return (
    <div ref={ref} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-3 overflow-hidden">
      <div className="relative w-full h-40 sm:h-48 rounded-md overflow-hidden">
        <Image src={ad.imageUrl} alt={ad.title} fill className="object-cover" />
      </div>
      <div className="mt-3">
        <h3 className="font-semibold text-sm">{ad.title}</h3>
        <p className="text-xs text-gray-400 mt-1">{ad.views.toLocaleString()} views</p>
      </div>
    </div>
  );
};

const AdSection = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    import("@/mock/ads").then((mod) => {
      const initial = (mod.ads || []) as Ad[];
      setAds(initial);
    });
  }, []);

  const handleView = (id: string) => {
    setAds((prev) => prev.map((a) => (a.id === id ? { ...a, views: a.views + 1 } : a)));
  };

  if (!ads.length) {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-40 bg-gray-100 dark:bg-gray-700 rounded-2xl animate-pulse" />
        ))}
      </section>
    );
  }

  return (
    <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} onView={handleView} />
      ))}
    </section>
  );
};

export default AdSection;
