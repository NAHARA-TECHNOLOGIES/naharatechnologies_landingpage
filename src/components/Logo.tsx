import { images } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src={images.logo}
        alt="Nahara Technologies"
        width={140}
        height={50}
        className="h-auto w-auto max-h-12 bg-red-800 text-red-800 rounded-lg"
        priority
      />
      <span className="text-[clamp(14px,2.5vw,16px)] font-bold text-red-800 hidden sm:inline">
        NAHARA TECHNOLOGIES
        <sup className="text-xs align-super ml-1 text-red-800">™</sup>
      </span>
    </Link>
  );
};

export default Logo;
