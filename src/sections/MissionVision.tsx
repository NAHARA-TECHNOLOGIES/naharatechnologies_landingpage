"use client";

import ImageWrap from "@/components/ImageWrap";
import LottieAnim from "@/components/LottieAnim";
import TitleDescription from "@/components/TitleDescription";
import { images, lottieAnims, missionText, visionText } from "@/constants";
import React from "react";

const MissionVision = () => {
  return (
    <div className="px-6 py-10 md:py-20 bg-black lg:px-[105px]">
      <div className="container">
        <TitleDescription
          className="max-w-[694px] ml-auto text-white"
          title="Our Vision"
          headerNumber={3}
          desc={visionText}
          titleStyle="text-h3"
          descStyle="mt-3 leading-normal text-bodySmall"
        />

        <LottieAnim
          lottieFile={lottieAnims.globe}
          className=" w-full my-5"
          animClass="h-64"
        />

        <TitleDescription
          className="max-w-[694px] text-white"
          title="Our Mission"
          headerNumber={3}
          desc={missionText}
          titleStyle="text-h3"
          descStyle="mt-3 leading-relaxed text-bodySmall"
        />
      </div>
    </div>
  );
};

export default MissionVision;
