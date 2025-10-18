"use client";

import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-3xl font-bold mb-2 text-red-600">Access Denied</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        You don’t have permission to view this page.
      </p>
      <button
        onClick={() => router.push("/blog")}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Go Back to Blog
      </button>
    </div>
  );
}
