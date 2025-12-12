"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedPosts from "@/components/sections/FeaturedPosts";
import TrendingPosts from "@/components/sections/TrendingSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import RecentPosts from "@/components/sections/RecentPostForHome";
import AdSection from "@/components/sections/AdSection";
import CallToAction from "@/components/CallToAction";

export default function BlogHome() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error") ?? null;

  useEffect(() => {
    if (error === "not_permitted") {
      toast.error("You’re not permitted to perform this action.");
    }
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <HeroSection />
      <FeaturedPosts />
      <TrendingPosts />
      <CategoriesSection />
      <AdSection />
      <RecentPosts limit={6} />
      <CallToAction />
    </div>
  );
}
