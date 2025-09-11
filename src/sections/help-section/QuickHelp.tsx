import ImageWrap from "@/components/ImageWrap";
import TitleDescription from "@/components/TitleDescription";
import { icons, supportOptions } from "@/constants";
import Image from "next/image";

const QuickHelp = () => {
  return (
    <div className="p-6 lg:px-[177px]">
      <h2 className="section-title">Need Quick Help?</h2>

      <div className="space-y-5 md:space-y-0 mt-10 md:flex items-start justify-between">
        {supportOptions.map(
          ({
            title,
            description,
            icon,
            btnText,
            responseTime,
            availability,
          }) => (
            <div
              key={title}
              className="py-[23px] px-[33px] bg-white w-full md:w-[calc((100%/3)-(51px/2))] h-[339px] shadow-lg flex flex-col justify-between"
            >
              <ImageWrap
                containerStyle="size-[60px] bg-[#991B1B29] rounded-full mx-auto flex items-center justify-center"
                source={icon}
                alt={title}
                imageStyle=""
              />

              <TitleDescription
                className="text-center"
                title={title}
                titleStyle="font-semibold text-xl"
                desc={description}
                descStyle="mt-2 text-gray-500"
              />

              <div className="text-sm text-gray-400">
                <div className="flex items-center justify-center">
                  <Image
                    src={icons.quick_help_response_icon}
                    alt="response"
                    className="size-5 mr-[5px]"
                  />
                  <p>Response time: {responseTime}</p>
                </div>

                <div className="flex items-center justify-center mt-[5px]">
                  <Image src={icons.quick_help_clock_icon} alt="response"  className="size-5 mr-[5px]" />
                  <p>Available:{availability.replace(/\./g, "")}</p>
                </div>
              </div>

              <button className="py-2 text-center bg-[#991B1B] w-full text-white">
                {btnText}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default QuickHelp;
