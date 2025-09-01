import ImageWrap from "@/components/ImageWrap";
import TitleDescription from "@/components/TitleDescription";
import { icons, supportOptions } from "@/constants";
import Image from "next/image";

const QuickHelp = () => {
  return (
    <div className="p-6 lg:px-[177px] border border-black">
      <h2 className="text-center">Need Quick Help?</h2>

      <div className="space-y-5 lg:space-y-0 mt-10 lg:flex items-start justify-between">
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
              className="py-[23px] px-[33px] bg-white w-full lg:w-[calc((100%/3)-(51px/2))] h-[339px] shadow-lg"
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
                titleStyle=""
                desc={description}
                descStyle=""
              />

              <div>
                <div className="flex items-center justify-center">
                  <Image src={icons.quick_help_response_icon} alt="response" />{" "}
                  <p>Response time: {responseTime}</p>
                </div>

                <div className="flex items-center justify-center">
                  <Image src={icons.quick_help_clock_icon} alt="response" />{" "}
                  <p>Available: {availability}</p>
                </div>
              </div>

              <button className="py-2 px-20 text-center bg-[#991B1B] w-full text-white">{btnText}</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default QuickHelp;
