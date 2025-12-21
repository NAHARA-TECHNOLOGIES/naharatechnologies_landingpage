"use client";

import CheckIcon from "@/assets/check.svg";
import Smart from "@/assets/smart.jpg";
import Doris from "@/assets/doris.jpg";
import Clinton from "@/assets/clinton2.jpg";
import Kosi from "@/assets/kosi.jpg";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion"; // Import Framer Motion

const teamMembers = [
  {
    name: "Smart Sunday",
    position: "Founder",
    role: "COO (Chief Operations Office)",
    experience: "Software engineer, Business developer",
    imageSrc: Smart.src,
    inverse: false,
  },
  {
    name: "Ebelechukwu Doris Okolo",
    position: "Co-founder",
    role: "CEO (Chief Executive Officer)",
    experience: "Software engineer and team lead",
    imageSrc: Doris.src,
    inverse: true,
  },
  {
    name: "Kosiso Ifeanyi Ofianwa",
    position: "Lead Project Manager",
    role: "Project Manager",
    experience: "Project manager,",
    imageSrc: Kosi.src,
    inverse: false,
  },
  {
    name: "Clinton Ngotta",
    position: "Chief Technical Officer",
    role: "CTO",
    experience: "Software engineer, team lead, CTO",
    imageSrc: Clinton.src,
    inverse: true,
  },
];

export const OurTeam = () => {
  return (
    <section className="py-24   ">
      <div className="container">
        <div className="max-w-[540px] mx-auto text-center">
          <h2 className="text-h2 mt-5 text-darkText dark:text-white">
            Meet Our Team
          </h2>
          <p className="text-bodyDefault leading-relaxed mt-4">
            We are a multidisciplinary team of creatives and technologists,
            working together to solve real business problems with clarity and
            precision.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 justify-center mt-10">
          {teamMembers.map(
            (
              { name, position, role, imageSrc, inverse, experience },
              index
            ) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className={twMerge(
                  "p-8 border border-[#F1F1F1] rounded-3xl shadow-[0_7px_14px_#EAEAEA] max-w-xs w-full flex flex-col items-center text-center",
                  inverse && "border-black bg-black text-white"
                )}
              >
                <Image
                  src={imageSrc}
                  alt={name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover mb-4"
                />

                <h3
                  className={twMerge(
                    "uppercase tracking-wide mb-2 text-bodyXS",
                    inverse ? "text-white/60" : "text-gray-500"
                  )}
                >
                  {position}
                </h3>

                <h4 className="text-h3 mb-1">{name}</h4>

                <p
                  className={twMerge(
                    "text-sm font-medium mb-4",
                    inverse ? "text-pink-300" : "text-red-900"
                  )}
                >
                  {role}
                </p>

                <ul className="flex flex-col gap-3 mt-4 text-sm text-left">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-5 w-5" />
                    <span>{experience}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5" />
                    <span>Strong team contributor</span>
                  </li>
                </ul>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
