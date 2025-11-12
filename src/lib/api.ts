// src/lib/api.js
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// export const api = {
//   login: async (email, password) => {
//     const res = await fetch(`${BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     if (!res.ok) throw new Error("Login failed");
//     return res.json();
//   },

//   register: async (email, password) => {
//     const res = await fetch(`${BASE_URL}/auth/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     if (!res.ok) throw new Error("Registration failed");
//     return res.json();
//   },
// };
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const api = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Login failed");
    }

    return res.json();
  },

  signup: async (username: string, email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Registration failed");
    }

    return res.json();
  },
};

