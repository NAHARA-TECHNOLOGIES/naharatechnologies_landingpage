import ImageWrap from "@/components/ImageWrap";
import TitleDescription from "@/components/TitleDescription";
import { helpTopics } from "@/constants";
import Link from "next/link";

const HelpCategories = () => {
  return (
    <div className="p-6 lg:py-10 lg:px-[183px] border border-black">
      <h2 className="text-center text-[2rem]">Quick Help Categories</h2>

      <div className="border-2 border-black lg:flex items-center justify-between flex-wrap gap-y-10 mt-[30px] space-y-6 lg:space-y-0">
        {helpTopics.map(({ title, description, link, icon }) => (
          <div
            key={title}
            className="bg-white shadow-lg py-[35px] px-[17px] rounded-[10px] lg:w-[48%] lg:min-h-[258px]"
          >
            <div>
              <ImageWrap
                containerStyle="size-10 border-black border-2 flex items-center justify-center"
                imageStyle=""
                source={icon}
                alt={title}
              />

              <TitleDescription
                title={title}
                desc={description}
                titleStyle=""
                descStyle=""
              />

              <Link href={link}>View topics</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCategories;
