"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
}

const RippleButton: React.FC<RippleButtonProps> = ({ label, active, className, ...props }) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; size: number }[]>([]);
  const rippleContainer = useRef<HTMLButtonElement>(null);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = rippleContainer.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = { x, y, size };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
  };

  return (
    <button
      ref={rippleContainer}
      onClick={createRipple}
      className={cn(
        "relative overflow-hidden px-5 py-2 rounded-full border dark:border-gray-700 font-medium transition-colors duration-300",
        "hover:bg-gradient-to-r hover:from-red-600 hover:via-rose-500 hover:to-orange-400 hover:text-white",
        active &&
          "bg-gradient-to-r from-red-600 via-rose-500 to-orange-400 text-white shadow-md scale-105",
        className
      )}
      {...props}
    >
      {label}
      {ripples.map((ripple, index) => (
        <span
          key={index}
          className="absolute bg-white/40 rounded-full animate-ripple"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  );
};

export default RippleButton;
