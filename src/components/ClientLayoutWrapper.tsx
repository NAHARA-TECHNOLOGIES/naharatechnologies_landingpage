"use client";

import React from "react";
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
      <Header />
      <TopButton />
      <QuickChatBox />
      {children}
      <Footer />
    </div> // ✅ Properly closed div
  );
}
