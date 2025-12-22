import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          lg: "80px",
        },
      },
      // fontFamily: {
      //   sans: ["var(--font-dm-sans)", "sans-serif"], // default body font
      //   poppins: ["var(--font-poppins)"], // secondary font
      //   sora: ["var(--font-sora)"],
      // },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
      },
      fontSize: {
        h1: [
          "clamp(30px, 6vw, 80px)",
          { lineHeight: "120%", fontWeight: "600" },
        ],
        h2: [
          "clamp(28px, 4vw, 32px)",
          { lineHeight: "120%", fontWeight: "600" },
        ],
        h3: [
          "clamp(18px, 2.5vw, 20px)",
          { lineHeight: "100%", fontWeight: "600" },
        ],
        bodyLarge: [
          "clamp(16px, 1.8vw, 18px)",
          { lineHeight: "100%", fontWeight: "400" },
        ],
        bodyDefault: [
          "clamp(14px, 1.5vw, 16px)",
          { lineHeight: "100%", fontWeight: "400" },
        ],
        bodySmall: [
          "clamp(12px, 1.2vw, 14px)",
          { lineHeight: "100%", fontWeight: "400" },
        ],
        bodyXS: [
          "clamp(10px, 1vw, 12px)",
          { lineHeight: "100%", fontWeight: "400" },
        ],
        caption: [
          "clamp(12px, 1.2vw, 14px)",
          { lineHeight: "100%", fontWeight: "700" },
        ],
      },
      fontWeight: {
        light: "300",
        regular: "400",
        semibold: "600",
        bold: "700",
      },
      colors: {
        brandRed: "#991B1B",
        darkText: "#1A1A1A",
        black: "#000000",
        white: "#FFFFFF",
        primaryButton: "#FFFFFF",
        captionText: "#D0D0D0",
        "background-light": "#f6f8f7",
        "background-dark": "#122118",
        "surface-dark": "#1a3324",
        "border-dark": "#254632",
        "text-secondary": "#95c6a9",
      },
    },
  },
  plugins: [],
};

export default config;
