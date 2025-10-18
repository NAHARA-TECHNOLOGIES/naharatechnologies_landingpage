"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast"; // if you use react-hot-toast

export default function BlogHome() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "not_permitted") {
      toast.error("You’re not permitted to perform this action.");
    }
  }, [error]);

  return (
    <div>
     
    </div>
  );
}
