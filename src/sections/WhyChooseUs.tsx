import ImageWrap from "@/components/ImageWrap";
import Overlay from "@/components/Overlay";
import TitleDescription from "@/components/TitleDescription";
import { doWeWorkText, images, whatWeWorkText } from "@/constants";
import React from "react";

const WhyChooseUs = () => {
  return (
    <div
      className="px-6 py-10 md:py-20 lg:px-[105px]   dark:from-gray-950 dark:to-gray-800  dark:text-gray-950
             text-gray-900 "
    >
      <div className="container">
        <TitleDescription
          title={
            <span className="relative inline-block text-h2 text-center text-darkText dark:text-gray-300">
              Why Choose Us
              <span className="absolute left-0 -bottom-1 h-1 bg-brandRed animate-underline"></span>
            </span>
          }
          titleStyle="text-center mb-8"
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

        <div className="relative w-full lg:block flex flex-col-reverse">
          <TitleDescription
            className="w-full bg-white lg:w-[50%] min-h-[200px] border p-6 flex flex-col justify-center shadow-lg rounded-3xl lg:rounded-e-3xl lg:rounded-es-3xl lg:absolute lg:top-[calc(50%+100px)] lg:right-0"
            title={
              <span className="relative inline-block dark:text-gray-950">
                We Partner With You
              </span>
            }
            titleStyle="text-h3 text-center lg:text-left"
            headerNumber={3}
            desc="Because you deserve more than just a service provider — you need a partner. One that listens. One that understands. One that delivers. At Nahara Technologies, we have the team, the strategy, and the heart to bring your ideas to life. Let's build a future where your brand doesn't just exist — it thrives."
            descStyle="text-gray-500 mt-3 text-bodySmall leading-normal"
          />

          {/* Image Section */}
          <ImageWrap
            source={images.whyChooseUS}
            containerStyle="w-full lg:w-[60%] h-[400px] mt-5 lg:mt-0"
            alt="why choose us"
            imageStyle="size-full object-top object-cover"
          />
        </div>

        <div className="lg:mt-40 lg:flex justify-between gap-8">
          <TitleDescription
            className="flex-1 p-6 border my-5 lg:my-0 bg-white shadow-lg rounded-3xl lg:rounded-e-3xl lg:rounded-es-3xl  flex flex-col justify-center "
            titleStyle="text-h3 text-center lg:text-left"
            headerNumber={3}
            title="Build Now, Pay Later"
            desc={whatWeWorkText}
            descStyle="text-gray-500 mt-3 text-bodySmall leading-normal"
          />
          <TitleDescription
            className="flex-1 p-6 border my-5 lg:my-0  bg-white shadow-lg rounded-3xl lg:rounded-e-3xl lg:rounded-es-3xl flex flex-col justify-center "
            title="We Bridge the Gap"
            titleStyle="text-h3 text-center lg:text-left"
            headerNumber={3}
            desc={doWeWorkText}
            descStyle="text-gray-500 mt-3 text-bodySmall leading-normal"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
