"use client";

import React, { Suspense } from "react";
import Header from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import TopButton from "@/components/topButton";
import { QuickChatBox } from "@/components/QuickChatBox";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<div className="min-h-[64px] bg-white/70 dark:bg-black/70" />}>
        <Header />
      </Suspense>
      <TopButton />
      <QuickChatBox />
      <Suspense fallback={<div className="min-h-screen animate-pulse bg-gray-100 dark:bg-gray-800" />}>
        {children}
      </Suspense>
      <Footer />
    </div>
  );
}
