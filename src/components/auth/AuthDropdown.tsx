"use client";
import React, { useState, useRef, useEffect } from "react";
import { Chrome, LogIn, UserPlus } from "lucide-react";
import LoginForm from "@/components/auth/login";
import RegisterForm from "@/components/auth/register";

interface AuthDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: { token: string; [key: string]: any }) => void; // type user object properly
}

const AuthDropdown = (props: AuthDropdownProps) => {
  const { isOpen, onClose, onAuthSuccess } = props; // destructure with proper typing
  const [isLogin, setIsLogin] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-96 bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-2xl p-6 z-[9999] animate-fadeIn backdrop-blur-md"
    >
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
          {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {isLogin ? "Sign in to continue" : "Join our community today"}
        </p>
      </div>

      {/* Forms */}
      {isLogin ? (
        <LoginForm
          onSuccess={(user) => {
            localStorage.setItem("token", user.token);
            onAuthSuccess(user);
            onClose();
          }}
        />
      ) : (
        <RegisterForm
          onSuccess={(user) => {
            localStorage.setItem("token", user.token);
            onAuthSuccess(user);
            onClose();
          }}
        />
      )}

      {/* Divider */}
      <div className="my-4 border-t border-gray-200 dark:border-gray-700 relative">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 px-2 text-sm text-gray-500">
          or
        </span>
      </div>

      {/* Social login */}
      <button
        type="button"
        className="w-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 
        hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
      >
        <Chrome size={18} />
        Continue with Google
      </button>

      {/* Toggle between login/register */}
      <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-300">
        {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthDropdown;
