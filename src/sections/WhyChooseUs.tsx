import ImageWrap from "@/components/ImageWrap";
import Overlay from "@/components/Overlay";
import TitleDescription from "@/components/TitleDescription";
import {images} from "@/constants";
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
                We Build With You, Not Just For You
              </span>
            }
            titleStyle="text-h3 text-center lg:text-left"
            headerNumber={3}
            desc="Because great products are not created in isolation,they are crafted through understanding, collaboration, and real partnership. At Nahara Technologies, we walk with you from idea to execution, ensuring your vision is heard, shaped, and brought to life with clarity and excellence."
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
            title="Growth Should not Be Held Back by Budget
"
            desc="Because every brand deserves the chance to show up strong online. With our “Build Now, Pay Later” model, you start with just 50% upfront while we develop, host, maintain, and support your product so you can scale without financial pressure slowing you down.
"
            descStyle="text-gray-500 mt-3 text-bodySmall leading-normal"
          />
          <TitleDescription
            className="flex-1 p-6 border my-5 lg:my-0  bg-white shadow-lg rounded-3xl lg:rounded-e-3xl lg:rounded-es-3xl flex flex-col justify-center "
            title="We Close the Space Between Vision and Reality"
            titleStyle="text-h3 text-center lg:text-left"
            headerNumber={3}
            desc="Because businesses often know what they want ,they just need the right team to make it real. We merge strategy, design, and technology to transform ideas into functional solutions that work, perform, and stand out. At Nahara Technologies, we don’t just execute; we elevate.
"
            descStyle="text-gray-500 mt-3 text-bodySmall leading-normal"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
