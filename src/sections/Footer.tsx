import Logo from "@/assets/NaharaTechnologiesWhite.png";
import Image from "next/image";
import SocialX from "@/assets/social-x.svg";
import SocialInsta from "@/assets/social-insta.svg";
import SocialLinkedin from "@/assets/social-linkedin.svg";
import SocialPin from "@/assets/social-pin.svg";
import SocialYoutube from "@/assets/social-youtube.svg";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-black text-bodySmall py-10 text-center relative overflow-hidden">
      <div className="container relative">
        {/* Watermark Text */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <h1 className="text-6xl sm:text-5xl lg:text-8xl tracking-tighter font-semibold text-gray-300 opacity-10 select-none">
            Nahara Technologies Plc
          </h1>
        </div>
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-[linear-gradient(to_right,_#991b1b,_#000000,_#ffffff)] before:absolute z-10">
          <Image
            src={Logo}
            height={40}
            alt="Nahara Technologies Logo"
            className="relative"
          />
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6 text-bodyDefault text-white dark:text-gray-300">
          <a href="/about">About</a>
          {/* <a href='/upcomingproducts'>Products to be released</a> */}
          {/* <a href='/customer'>Customers</a> */}
          <a href="/career">Careers</a>
          <a href="/help">Help</a>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-6 ">
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <SocialX />
          </Link>

          <Link
            href={"https://www.facebook.com/share/1BQ1sCrnC3/"}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <FaFacebook size={24} />
          </Link>
          <Link
            href="https://www.instagram.com/nahara_technologies?igsh=MTBzNXhyN3o2cWh4bA=="
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <SocialInsta />
          </Link>
          <Link
            href="https://www.linkedin.com/company/naharatechnologies/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <SocialLinkedin />
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <SocialPin />
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <SocialYoutube />
          </Link>
        </div>

        <p className="mt-6 z-10 relative text-bodySmall text-white dark:text-gray-400">
          &copy; 2025 Nahara Technologies
          <sup className="text-xs align-super ml-1 text-gray-300">™</sup>Plc.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};
