import ImageWrap from "@/components/ImageWrap";
import TitleDescription from "@/components/TitleDescription";
import { howWeWorkContent } from "@/constants";
import Image from "next/image";
import React from "react";
import howWeWorkImg from "@/assets/how-we-work.png";
import CoreValue from "@/assets/core-value.png";
import { CheckCircle } from "lucide-react";

const coreValues = [
  {
    title: "Integrity",
    desc: "We do what is right always",
  },
  {
    title: "Dedication",
    desc: "We pursue excellence with passion and persistence",
  },
  {
    title: "Excellence",
    desc: "We raise the bar, then go beyond it.",
  },
  {
    title: "Customer Focus",
    desc: "We value your vision and amplify your voice",
  },
  {
    title: "Innovation",
    desc: "We embrace change, leveraging technology to lead it.",
  },
  {
    title: "Accountability",
    desc: "We own outcomes and deliver results you can trust",
  },
];

const HowWeWork = () => {
  return (
    <div
      className="px-6 py-10 md:py-20 lg:px-[105px]  dark:from-gray-950 dark:to-gray-800 
             text-gray-900 dark:text-gray-100 "
    >
      <div className="container">
        <TitleDescription
          title="How We Work At Nahara Technologies"
          className="text-center"
          titleStyle="text-h2"
          desc="Blending skill and technology to deliver smart, reliable solutions."
          descStyle="mt-2 hidden lg:block text-bodyLarge text-gray-500"
          headerNumber={2}
          titleAnimProps={{
            initial: { y: -50, opacity: 0 },
            whileInView: { y: 0, opacity: 1 },
          }}
          descAnimProps={{
            initial: { y: -150, opacity: 0 },
            whileInView: { y: 0, opacity: 1, transition: { delay: 0.5 } },
          }}
        />

        <div className="mt-10 space-y-20">
          {/* Section 1: Image left, text right */}
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2 w-full">
              <Image
                src={howWeWorkImg}
                alt="How we work"
                width={600}
                height={200}
                className="w-full object-cover"
              />
            </div>

            <div className="lg:w-1/2 w-full lg:-mt-6">
              <h2 className="text-h2 relative inline-block text-darkText">
                We stretch beyond boundary
                <span className="absolute left-0 -bottom-1 h-1 bg-brandRed animate-underline w-0"></span>
              </h2>
              <p className="text-bodyLarge leading-relaxed text-gray-500 mt-4">
                From launching promising startups to scaling thriving
                enterprises. We combine creative brilliance with technical
                expertise to bridge the gap between branding and technology,
                helping businesses stand out and stay relevant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
