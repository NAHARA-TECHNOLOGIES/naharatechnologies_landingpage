"use client";

import ImageWrap from "@/components/ImageWrap";
import LottieAnim from "@/components/LottieAnim";
import TitleDescription from "@/components/TitleDescription";
import { images, lottieAnims, missionText, visionText } from "@/constants";
import React from "react";

const MissionVision = () => {
  return (
    <div className="px-6 py-10 bg-black lg:px-[105px]">
      <div className="container">
        <TitleDescription
          className="max-w-[694px] ml-auto text-white"
          title="Our Vision"
          desc={visionText}
          titleStyle="text-lg font-bold"
          descStyle="mt-1"
        />

        {/* <LottieAnim lottieFile={lottieAnims.globe} className="size-full my-5" /> */}
        <LottieAnim
          lottieFile={lottieAnims.globe}
          className=" w-full my-5"
          animClass="h-64"
        />

        <TitleDescription
          className="max-w-[694px] text-white"
          title="Our Mission"
          desc={missionText}
          titleStyle="text-lg font-bold"
          descStyle="mt-1"
        />
      </div>
    </div>
  );
};

export default MissionVision;
