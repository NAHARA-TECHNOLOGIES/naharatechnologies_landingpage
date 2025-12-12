import ImageWrap from "@/components/ImageWrap";
import TitleDescription from "@/components/TitleDescription";
import { helpTopics } from "@/constants";
import Link from "next/link";

const HelpCategories = () => {
  return (
    <div className="p-6 py-10 md:py-20 lg:px-[183px]">
      <h2 className="text-h2 text-center">Quick Help Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        {helpTopics.map(({ title, description, link, icon }) => (
          <div
            key={title}
            className="bg-white dark:bg-gray-900 shadow-lg py-[35px] px-[17px] rounded-[10px] md:min-h-[200px]"
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
                headerNumber={3}
                titleStyle="text-h3"
                descStyle="mt-3 text-gray-500 text-bodySmall leading-relaxed"
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
