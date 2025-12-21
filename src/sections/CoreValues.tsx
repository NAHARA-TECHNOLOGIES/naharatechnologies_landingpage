import CoreValueRow from "@/components/CoreValueRow";
import TitleDescription from "@/components/TitleDescription";
// import { coreValues } from "@/constants";
import Image from "next/image";
import React from "react";
import CoreValue from "@/assets/core-value.png";
import { CheckCircle } from "lucide-react";

const coreValues = [
  {
    title: "Integrity",
    desc: "We choose what is right always. Even when it’s harder, even when no one is watching.",
  },
  {
    title: "Dedication",
    desc: "We show up with passion, persistence, and an unwavering commitment to your success.",
  },
  {
    title: "Excellence",
    desc: "We don’t just meet expectations, we push beyond them, raising the standard every time.",
  },
  {
    title: "Customer Focus",
    desc: "Your vision matters. We listen, we understand, and we amplify your voice through everything we build.",
  },
  {
    title: "Innovation",
    desc: "We embrace change with curiosity and courage, using technology to create what’s next.",
  },
  {
    title: "Accountability",
    desc: "We take ownership from start to finish, delivering results you can trust and solutions you can rely on.",
  },
];

const CoreValues = () => {
  return (
    <div className="px-6 py-10 md:py-20 lg:px-[105px]">
      <div className="container relative">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 w-full">
            <h2 className="text-h2 text-darkText mb-3 dark:text-gray-300">
              Everything we do is anchored on our core values (IDECIA)
            </h2>
            <p className="text-bodyLarge text-gray-500 mb-6 dark:text-gray-400 leading-relaxed">
            The six pillars that shape our culture and guide every experience we create.

            </p>

            <ul className="space-y-6">
              {coreValues.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle className="text-brandRed" size={20} />
                  <div>
                    <h3 className="text-h3 font-semibold text-darkText dark:text-gray-500">
                      {item.title}
                    </h3>
                    <p className="text-bodySmall text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 w-full  ">
            <Image
              src={CoreValue}
              alt="Core values"
              width={600}
              height={200}
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreValues;
