"use client";
import Link from "next/link";
import React, { useState, useRef } from "react";
import AuthDropdown from "./AuthDropdown";
import ProfileMenu from "./ProfileMenu";

const NavBar = ({ className }: { className: string }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const linkClasses =
    "relative font-semibold tracking-wide text-black dark:text-white " +
    "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] " +
    "after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full";

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="relative">
      <nav
        className={`${className} flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 md:items-center`}
      >
        <Link href="/about" className={linkClasses}>
          About
        </Link>
        <Link href="/career" className={linkClasses}>
          Career
        </Link>
        <Link href="/help" className={linkClasses}>
          Help
        </Link>
        <Link href="/blog" className={linkClasses}>
          Tech Updates
        </Link>

        {!isAuthenticated ? (
          <div className="relative">
          <button
      ref={buttonRef}
      onClick={() => setShowDropdown(!showDropdown)}
      className="bg-red-800 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition inline-flex items-center justify-center md:ml-2"
    >
      Get Started
    </button>


            {/* Dropdown Login */}
            <div className="absolute right-0 mt-2">
              <AuthDropdown
                isOpen={showDropdown}
                onClose={() => setShowDropdown(false)}
                onAuthSuccess={() => {
                  setIsAuthenticated(true);
                  setShowDropdown(false);
                }}
              />
            </div>
          </div>
        ) : (
          <ProfileMenu onLogout={handleLogout} />
        )}

        <Link href="/contact">
 <button
    className="bg-black dark:bg-white text-white dark:text-black font-medium px-4 py-2 rounded-lg hover:opacity-90 transition inline-flex items-center justify-center tracking-tight md:ml-2"
  >            Contact Us
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
