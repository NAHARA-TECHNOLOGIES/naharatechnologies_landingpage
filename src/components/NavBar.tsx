"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthDropdown from "./AuthDropdown";
import Image from "next/image";

<<<<<<< Updated upstream
const NavBar = ({ className }: { className: string }) => {
=======
const NavBar = ({
  className,
  onCloseMenu,
}: {
  className: string;
  onCloseMenu?: () => void;
}) => {
>>>>>>> Stashed changes
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
<<<<<<< Updated upstream
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
if (searchParams.get("authRequired") === "true") {
  setShowDropdown(true);
}

  }, [searchParams]);
=======
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
>>>>>>> Stashed changes

  const linkClasses =
    "relative font-semibold tracking-wide text-black dark:text-white " +
    "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] " +
    "after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full";

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
<<<<<<< Updated upstream
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowDropdown(false);

    const redirectTo = searchParams.get("redirectTo");
    if (redirectTo) {
      router.push(redirectTo);
    }
=======
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
>>>>>>> Stashed changes
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

            <div className="absolute right-0 mt-2">
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
              <div
                className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-lg py-2 border border-gray-100 z-50 animate-fade-in"
              >
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

        <Link href="/contact">
          <button
            className="bg-black dark:bg-white text-white dark:text-black font-medium px-4 py-2 rounded-lg hover:opacity-90 transition inline-flex items-center justify-center tracking-tight md:ml-2"
          >
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
