"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import ArrowRight from "@/assets/arrow-right.svg";
import MenuIcon from "@/assets/menu.svg";
import NavBar from "@/components/NavBar";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 18a6 6 0 100-12 6 6 0 000 12zM12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zM12 19a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM4.22 5.64a1 1 0 011.42 0l1.42 1.42a1 1 0 01-1.42 1.42L4.22 7.05a1 1 0 010-1.41zM17.66 17.66a1 1 0 011.41 0l1.42 1.42a1 1 0 11-1.42 1.42l-1.41-1.42a1 1 0 010-1.42zM2 13a1 1 0 100-2h2a1 1 0 100 2H2zM20 13a1 1 0 100-2h2a1 1 0 100 2h-2zM6.64 17.66a1 1 0 010 1.42L5.22 20.5a1 1 0 01-1.42-1.42l1.42-1.42a1 1 0 011.42 0zM18.36 6.64a1 1 0 010-1.42l1.42-1.42a1 1 0 111.42 1.42L19.78 6.64a1 1 0 01-1.42 0z" />
  </svg>
);
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M21 12.79A9 9 0 0111.21 3a1 1 0 00-1.21 1.21A7 7 0 1019.79 13a1 1 0 001.21-1.21z" />
  </svg>
);

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const finalTheme = savedTheme || (prefersDark ? "dark" : "light");
      setTheme(finalTheme);
      document.documentElement.classList.toggle("dark", finalTheme === "dark");
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex items-center justify-center size-8 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-yellow-400 shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const isBlogPage = pathname === "/blog";

  return (
    <header className="sticky top-0 z-[100] backdrop-blur-sm bg-white/70 dark:bg-black/70 transition-colors">
      <div className="flex justify-center items-center py-3 bg-black text-white text-caption gap-3 dark:bg-gray-900">
        <p className="text-white/60 hidden md:block">
          Try our installmental plan
        </p>
        <div className="inline-flex gap-1 items-center">
          <p className="">
            Get your dream to live with the little you have
          </p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
        </div>
      </div>

      <div className="py-3 px-4 md:px-6">
        <div
          className={`flex justify-between items-center ${
            !isBlogPage ? "gap-2" : "gap-4"
          }`}
        >
          <div className="flex flex-col gap-2">
            <Logo />
            {isBlogPage && (
              <div className="md:hidden sticky top-0 z-50 mt-2">
                <Suspense
                  fallback={
                    <div className="h-10 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
                  }
                >
                  <SearchBar />
                </Suspense>
              </div>
            )}
          </div>

          {isBlogPage && (
            <div className="hidden md:block">
              <Suspense
                fallback={
                  <div className="h-10 w-64 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
                }
              >
                <SearchBar />
              </Suspense>
            </div>
          )}

          <div className="hidden md:flex items-center gap-5">
            <ThemeToggle />
            <Suspense
              fallback={
                <div className="h-6 w-48 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
              }
            >
              <NavBar className="flex items-center gap-5 text-black/70 dark:text-gray-200 list-none" />
            </Suspense>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="ml-2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full shadow-md hover:scale-110 transition"
              aria-label="Toggle navigation"
            >
              <MenuIcon className="h-6 w-6 text-black dark:text-white" />
            </button>
          </div>
        </div>

        {isMobileNavOpen && (
          <div className="mt-4 flex flex-col gap-4 text-black/80 dark:text-gray-200 md:hidden list-none">
            <Suspense
              fallback={
                <div className="h-64 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
              }
            >
              <NavBar
                className="flex flex-col gap-4 text-black/80 dark:text-gray-200 list-none"
                onCloseMenu={() => setIsMobileNavOpen(false)}
              />
            </Suspense>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
