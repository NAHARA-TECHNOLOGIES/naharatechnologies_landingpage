// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { api } from "@/lib/api";
// import { Eye, EyeOff, Loader2, Lock, Mail, LogIn, UserPlus, Chrome } from "lucide-react";

// const AuthDropdown = ({ isOpen, onClose, onAuthSuccess }: any) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
//         onClose();
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [onClose]);

//   const getPasswordStrength = (password: string) => {
//     if (password.length < 6) return "Weak";
//     if (/[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8)
//       return "Strong";
//     return "Medium";
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const formData = new FormData(e.target as HTMLFormElement);
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     const username = formData.get("username") as string;

//     try {
//       const res = isLogin
//         ? await api.login(email, password)
//         : await api.register(username,email, password);

//       localStorage.setItem("token", res.token);
//       onAuthSuccess(res.user);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       ref={dropdownRef}
//       className="absolute right-0 mt-3 w-96 bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-2xl p-6 z-[9999] animate-fadeIn backdrop-blur-md"
//     >
//       <div className="text-center mb-4">
//         <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
//           {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
//           {isLogin ? "Welcome Back" : "Create Account"}
//         </h2>
//         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//           {isLogin ? "Sign in to continue" : "Join our community today"}
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="relative">
//           <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email address"
//             className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-gray-800 dark:text-white placeholder-gray-400"
//             required
//           />
//         </div>

//         <div className="relative">
//           <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-gray-800 dark:text-white placeholder-gray-400"
//             required
//             onChange={(e) =>
//               setPasswordStrength(getPasswordStrength(e.target.value))
//             }
//           />
//           <button
//             type="button"
//             className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         </div>

//         {!isLogin && passwordStrength && (
//           <p
//             className={`text-xs font-medium ${
//               passwordStrength === "Weak"
//                 ? "text-red-500"
//                 : passwordStrength === "Medium"
//                 ? "text-yellow-500"
//                 : "text-green-500"
//             }`}
//           >
//             Password strength: {passwordStrength}
//           </p>
//         )}

//         <div className="flex items-center justify-between text-sm">
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               className="accent-red-700"
//               name="remember"
//             />
//             <span className="text-gray-600 dark:text-gray-300">Remember me</span>
//           </label>
//           {isLogin && (
//             <button
//               type="button"
//               className="text-blue-600 dark:text-blue-400 hover:underline"
//             >
//               Forgot password?
//             </button>
//           )}
//         </div>

//         {error && (
//           <p className="text-sm text-center text-red-500 font-medium">{error}</p>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded-lg flex justify-center items-center gap-2 transition disabled:opacity-70"
//         >
//           {loading ? <Loader2 className="animate-spin" size={18} /> : null}
//           {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
//         </button>
//       </form>

//       <div className="my-4 border-t border-gray-200 dark:border-gray-700 relative">
//         <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 px-2 text-sm text-gray-500">
//           or
//         </span>
//       </div>

//       <button
//         type="button"
//         className="w-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
//       >
//         <Chrome size={18} />
//         Continue with Google
//       </button>

//       <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-300">
//         {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
//         <button
//           onClick={() => setIsLogin(!isLogin)}
//           className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
//         >
//           {isLogin ? "Register" : "Login"}
//         </button>
//       </p>
//     </div>
//   );
// };

// export default AuthDropdown;
"use client";
import React, { useState, useRef, useEffect } from "react";
import { api } from "@/lib/api";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  LogIn,
  UserPlus,
  Chrome,
  User,
} from "lucide-react";

const AuthDropdown = ({ isOpen, onClose, onAuthSuccess }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8)
      return "Strong";
    return "Medium";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    try {
      const res = isLogin
        ? await api.login(email, password)
        : await api.signup(username, email, password);

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

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Show username input only during registration */}
        {!isLogin && (
          <div className="relative">
            <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
              focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-gray-800 dark:text-white placeholder-gray-400"
              required
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
            focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-gray-800 dark:text-white placeholder-gray-400"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
            focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-gray-800 dark:text-white placeholder-gray-400"
            required
            onChange={(e) =>
              setPasswordStrength(getPasswordStrength(e.target.value))
            }
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {!isLogin && passwordStrength && (
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-red-700" name="remember" />
            <span className="text-gray-600 dark:text-gray-300">Remember me</span>
          </label>
          {isLogin && (
            <button
              type="button"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot password?
            </button>
          )}
        </div>

        {error && (
          <p className="text-sm text-center text-red-500 font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded-lg flex justify-center items-center gap-2 transition disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : null}
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className="my-4 border-t border-gray-200 dark:border-gray-700 relative">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 px-2 text-sm text-gray-500">
          or
        </span>
      </div>

      <button
        type="button"
        className="w-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 
        hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
      >
        <Chrome size={18} />
        Continue with Google
      </button>

      <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-300">
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
