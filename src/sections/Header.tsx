"use client";

import { useState, useEffect } from "react";
import ArrowRight from "@/assets/arrow-right.svg";
import MenuIcon from "@/assets/menu.svg";
import NavBar from "@/components/NavBar";
import Logo from "@/components/Logo";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 18a6 6 0 100-12 6 6 0 000 12zM12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zM12 19a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM4.22 5.64a1 1 0 011.42 0l1.42 1.42a1 1 0 01-1.42 1.42L4.22 7.05a1 1 0 010-1.41zM17.66 17.66a1 1 0 011.41 0l1.42 1.42a1 1 0 11-1.42 1.42l-1.41-1.42a1 1 0 010-1.42zM2 13a1 1 0 100-2h2a1 1 0 100 2H2zM20 13a1 1 0 100-2h2a1 1 0 100 2h-2zM6.64 17.66a1 1 0 010 1.42L5.22 20.5a1 1 0 01-1.42-1.42l1.42-1.42a1 1 0 011.42 0zM18.36 6.64a1 1 0 010-1.42l1.42-1.42a1 1 0 111.42 1.42L19.78 6.64a1 1 0 01-1.42 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 0111.21 3a1 1 0 00-1.21 1.21A7 7 0 1019.79 13a1 1 0 001.21-1.21z" />
  </svg>
);

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load saved theme
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      if (savedTheme) {
        setTheme(savedTheme);
        if (savedTheme === "dark") document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const defaultTheme = prefersDark ? "dark" : "light";
        setTheme(defaultTheme);
        if (prefersDark) document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="ml-4 rounded-full p-2 transition bg-gray-200 dark:bg-gray-700 hover:scale-110"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 backdrop-blur-sm z-[100] bg-white/70 dark:bg-black/70 transition-colors">
      {/* Announcement Bar */}
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3 dark:bg-gray-900">
        <p className="text-white/60 hidden md:block">Try our installmental plan</p>
        <div className="inline-flex gap-1 items-center">
          <p className="font-semibold">Get Your dream to live with the little you have</p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
        </div>
      </div>

      {/* Main Header */}
      <div className="py-5">
        <div className="container">
          <div className="flex justify-between items-center">
            <Logo />

            {/* Show toggle only when mobile nav is closed */}
            {!isMobileNavOpen && <ThemeToggle />}

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} className="md:hidden ml-2">
              <MenuIcon className="h-6 w-6 text-black dark:text-white" />
            </button>

            {/* Desktop Nav */}
            <NavBar
              setIsMobileNavOpen={setIsMobileNavOpen}
              className="hidden md:flex items-center gap-6 text-black/70 dark:text-gray-200 list-none"
            />
          </div>

          {/* Mobile Nav */}
          {isMobileNavOpen && (
            <NavBar
              setIsMobileNavOpen={setIsMobileNavOpen}
              className="mt-4 flex flex-col gap-4 text-black/80 dark:text-gray-200 md:hidden list-none"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
