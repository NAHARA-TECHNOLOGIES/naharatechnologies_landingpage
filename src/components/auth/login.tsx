"use client";
import React, { useState } from "react";
import { api } from "@/lib/api";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

interface LoginFormProps {
  onSuccess: (user: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const identifier = formData.get("email") as string; // email or username
    const password = formData.get("password") as string;

    try {
      const res = await api.login(identifier, password);
      localStorage.setItem("token", res.token); // save JWT
      onSuccess(res.user); // pass user info to parent component
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="relative">
        <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          name="email"
          placeholder="Email or Username"
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
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded-lg flex justify-center items-center gap-2 transition"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
