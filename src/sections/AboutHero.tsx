import ImageWrap from "@/components/ImageWrap";
import Overlay from "@/components/Overlay";
import TitleDescription from "@/components/TitleDescription";
import { images } from "@/constants";
import React from "react";

const AboutHero = () => {
  return (
    <div className="w-full h-[450px] border lg:h-[500px] relative">
      <Overlay className="bg-black/30 inset-0 flex items-center justify-center">
        <TitleDescription
          className="text-center"
          title="About Us"
          titleStyle="text-[28px] lg:text-8xl font-bold text-white"
          desc="Our Vision and Our Mission"
          descStyle="text-white font-medium text-xl lg:text-2xl"
        />
      </Overlay>

      <div className="relative size-full">
        {[...new Array(4)].map((_, index) => {
          let clipClassName = [
            "polygon-clip-1",
            "polygon-clip-2",
            "polygon-clip-3",
            "polygon-clip-4",
          ];

          return (
            <ImageWrap
              key={index}
              containerStyle={`lg:mb-10 size-full lg:h-[500px] absolute -z-10 ${clipClassName[index]}`}
              source={images.SmileImg}
              alt={`about us banner ${index}`}
              imageStyle="size-full object-center object-cover"
              imageWrapAnimProps={{
                initial: { x: 500, opacity: 0 },
                animate: {
                  x: 0,
                  opacity: 1,
                  transition: { delay: index * 0.25 },
                },
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AboutHero;
