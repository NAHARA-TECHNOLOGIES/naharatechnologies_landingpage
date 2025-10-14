"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/NaharaTechnologiesWhite.png"; // Replace with your logo

export const QuickChatBox = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const phoneNumber = "2349078781812";

  const handleSend = () => {
    if (!message.trim()) return;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setMessage("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
      {open && (
        <div className="bg-white p-4 rounded-xl shadow-xl w-[90vw] max-w-xs sm:w-72 border border-gray-300 mb-3">
          <h4 className="font-bold text-lg text-black mb-2">Chat with us</h4>
          <textarea
            rows={3}
            className="w-full border border-gray-300 rounded-md p-2 text-sm text-black resize-none"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="mt-3 w-full bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
            onClick={handleSend}
          >
            Send via WhatsApp
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-red-800 text-white py-2 px-3 sm:px-4 rounded-full shadow-lg hover:scale-105 transition-all"
      >
        <Image
          src={Logo}
          alt="Logo"
          width={32}
          height={32}
          className="rounded-full p-1"
        />
        <span className="text-xs sm:text-sm font-medium">Quick chat with us</span>
      </button>
    </div>
  );
};
