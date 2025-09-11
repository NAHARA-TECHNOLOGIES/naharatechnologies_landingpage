import ImageWrap from "@/components/ImageWrap";
import TitleDescription from "@/components/TitleDescription";
import { helpTopics } from "@/constants";
import Link from "next/link";

const HelpCategories = () => {
  return (
    <div className="p-6 lg:py-10 lg:px-[183px]">
      <h2 className="section-title">Quick Help Categories</h2>

      <div className="md:flex items-center justify-between flex-wrap gap-y-10 mt-[30px] space-y-6 md:space-y-0">
        {helpTopics.map(({ title, description, link, icon }) => (
          <div
            key={title}
            className="bg-white shadow-lg py-[35px] px-[17px] rounded-[10px] md:w-[48%] md:min-h-[258px]"
          >
            <div className="max-w-[347px] space-y-[13px]">
              <ImageWrap
                containerStyle="size-10 flex items-center justify-center"
                imageStyle="size-[30px]"
                source={icon}
                alt={title}
              />

              <TitleDescription
                title={title}
                desc={description}
                titleStyle="font-semibold text-xl"
                descStyle="mt-[13px] text-gray-500 text-md"
              />

              <Link href={link} className="inline-block underline text-gray-400">View topics</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCategories;
