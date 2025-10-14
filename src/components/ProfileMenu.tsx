"use client";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const ProfileMenu = ({ onLogout }: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <FaUserCircle size={20} className="text-gray-600 dark:text-gray-300" />
        <span className="font-medium text-gray-800 dark:text-gray-200">
          Admin
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 z-50">
          <Link
            href="/admin/dashboard"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            Dashboard
          </Link>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            Logout
          </button>
          <button
            onClick={() => alert("Delete Account clicked")}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
