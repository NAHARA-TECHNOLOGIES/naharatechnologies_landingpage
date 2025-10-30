"use client";

import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition"
    >
      <FaArrowUp size={20} />
    </button>
  );
}
