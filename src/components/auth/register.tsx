"use client";
import React, { useState } from "react";
import { api } from "@/lib/api";
import { Mail, Lock, Eye, EyeOff, Loader2, User } from "lucide-react";

const RegisterForm = ({ onSuccess }: { onSuccess: (user: any) => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8)
      return "Strong";
    return "Medium";
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
   
    try {
      const res = await api.signup(username, email, password);
      localStorage.setItem("token", res.token);
      onSuccess(res.user);
    } catch (err: any) {
      const message = err.message || "Registration failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="relative">
        <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
          focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="relative">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          className="w-full pl-3 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="relative">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
          className="w-full pl-3 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
          focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          required
          className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
          focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-gray-800 dark:text-white"
          onChange={(e) =>
            setPasswordStrength(getPasswordStrength(e.target.value))
          }
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {passwordStrength && (
        <p
          className={`text-xs font-medium ${
            passwordStrength === "Weak"
              ? "text-red-500"
              : passwordStrength === "Medium"
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
          Password strength: {passwordStrength}
        </p>
      )}

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded-lg flex justify-center items-center gap-2 transition"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
