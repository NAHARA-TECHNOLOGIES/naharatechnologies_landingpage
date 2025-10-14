"use client";
import React, { useState, useRef, useEffect } from "react";
import { api } from "@/lib/api";

const AuthDropdown = ({ isOpen, onClose, onAuthSuccess }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = isLogin
        ? await api.login(email, password)
        : await api.register(email, password);

      localStorage.setItem("token", res.token);
      onAuthSuccess(res.user);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-xl p-5 z-[9999] animate-slideDown"
    >
      <h2 className="text-lg font-semibold text-center mb-2 text-gray-900 dark:text-white">
        {isLogin ? "Admin Login" : "Admin Registration"}
      </h2>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        {isLogin ? "Sign in to manage your dashboard" : "Create a new admin account"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white placeholder-gray-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white placeholder-gray-400"
          required
        />
        {error && <p className="text-sm text-center text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-800 hover:bg-red-700 text-white font-medium py-2 rounded-md transition disabled:opacity-70"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p className="text-center text-sm mt-3 text-gray-600 dark:text-gray-300">
        {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
        <button
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
