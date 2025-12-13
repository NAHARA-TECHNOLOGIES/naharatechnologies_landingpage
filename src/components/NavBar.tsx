"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthDropdown from "./AuthDropdown";
import Image from "next/image";

const NavBar = ({
  className,
  onCloseMenu,
}: {
  className: string;
  onCloseMenu?: () => void;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMoreLinks, setShowMoreLinks] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const savedProfile = localStorage.getItem("profileImage");
      if (savedProfile) setProfileImage(savedProfile);
    }

    const loginParam = searchParams?.get("login");
    if (loginParam === "true") {
      setShowDropdown(true);
      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClasses =
    "relative font-semibold tracking-tighter text-sm text-black dark:text-white " +
    "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] " +
    "after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full";

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
    onCloseMenu?.();
    setShowDropdown(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowDropdown(false);
    const redirectTo = searchParams?.get("redirectTo");
    if (redirectTo) {
      router.push(redirectTo);
    }
    onCloseMenu?.();
  };

  const handleLinkClick = () => {
    if (onCloseMenu) onCloseMenu();
  };

  return (
    <div className="relative">
      <nav
        className={`${className} flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center`}
      >
        <Link href="/about" className={linkClasses} onClick={handleLinkClick}>
          About
        </Link>

        <Link href="/career" className={linkClasses} onClick={handleLinkClick}>
          Career
        </Link>

        <div className="relative md:hidden">
          <button
            onClick={() => setShowMoreLinks(!showMoreLinks)}
            className="flex items-center gap-1 font-semibold text-black dark:text-white hover:opacity-80 transition"
          >
            <span>More</span>
            <span
              className={`transition-transform duration-300 ${
                showMoreLinks && "rotate-180"
              }`}
            >
              ▼
            </span>
          </button>

          <div
            className={`absolute top-full left-0 mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-md z-50 overflow-hidden transform transition-all duration-300 ${
              showMoreLinks
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-0 pointer-events-none"
            } origin-top`}
          >
            <Link
              href="/help"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                setShowMoreLinks(false);
                handleLinkClick();
              }}
            >
              Help
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                setShowMoreLinks(false);
                handleLinkClick();
              }}
            >
              Tech Updates
            </Link>
          </div>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link href="/help" className={linkClasses} onClick={handleLinkClick}>
            Help
          </Link>
          <Link href="/pricing" className={linkClasses} onClick={handleLinkClick}>
            Pricing
          </Link>

          <Link href="/blog" className={linkClasses} onClick={handleLinkClick}>
            Tech Updates
          </Link>
        </div>

        {!isAuthenticated ? (
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-brandRed text-primaryButton font-medium text-bodySmall px-4 py-2 rounded-lg hover:opacity-90 transition inline-flex items-center justify-center md:ml-2"
            >
              Get Started
            </button>

            <div
              className={`absolute right-0 mt-2 transition-transform md:translate-y-0 ${
                showDropdown
                  ? "-translate-y-16 md:translate-y-0"
                  : "translate-y-0"
              }`}
            >
              <AuthDropdown
                isOpen={showDropdown}
                onClose={() => setShowDropdown(false)}
                onAuthSuccess={handleAuthSuccess}
              />
            </div>
          </div>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              ref={buttonRef}
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <Image
                src={profileImage || "/default-avatar.png"}
                alt="Profile"
                width={38}
                height={38}
                className="rounded-full border border-gray-300 hover:scale-105 transition-transform"
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-lg py-2 border border-gray-100 z-50 animate-fade-in">
                <button
                  onClick={() => {
                    router.push("/admin/dashboard?tab=manageprofile");
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Manage Account
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        <Link href="/contact" onClick={handleLinkClick}>
          <button className="bg-black dark:bg-white text-primaryButton dark:text-darkText font-medium text-bodySmall px-4 py-2 rounded-lg hover:opacity-90 transition inline-flex items-center justify-center tracking-tight">
            Contact Us
          </button>
        </Link>
      </nav>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default NavBar;
