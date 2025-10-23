'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ads as mockAds } from '@/mock/ads'; // ✅ import directly

type Ad = {
  id: string;
  title: string;
  imageUrl: string;
  views: number;
};

const AdSection = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setAds(mockAds);
    }, 300); // delay to mimic loading
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {ads.map(ad => (
        <div key={ad.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <Image
            src={ad.imageUrl}
            alt={ad.title}
            width={400}
            height={250}
            className="w-full h-auto object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{ad.title}</h3>
            <p className="text-sm text-gray-500">{ad.views} views</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AdSection;
