import ImageWrap from "@/components/ImageWrap";
import Overlay from "@/components/Overlay";
import SearchBar from "@/components/SearchBar";
import TitleDescription from "@/components/TitleDescription";
import { images } from "@/constants";

const HelpHero = () => {
  return (
    <div className="min-h-[450px] lg:min-h-[786px] justify-center relative help-hero-bg py-10 px-6 lg:pt-[216px] lg:pb-[280px] flex flex-col justify-center">
      <Overlay className="inset-0 bg-[#3309099C] z-10" />
      <div className="relative z-20 text-center text-white w-full max-w-[945px] mx-auto">
        <h2 className="text-2xl sm:text-[2.2vw] lg:text-[2rem] font-semibold">
          Welcome to Help Center
        </h2>

        <TitleDescription
          title="How Can We Help You?"
          desc="Get quick answers, explore our knowledge base, or connect with our support team—anytime, anywhere."
          titleStyle="text-[5.5vw] font-semibold"
          descStyle="text-lg w-[100%] max-w-[541px] border mx-auto"
        />
      </div>

      <div className="relative z-20 mt-[46px] w-full max-w-[945px] flex flex-col lg:flex-row justify-between mx-auto">
        <SearchBar
          showIcon={false}
          containerClassName="w-full lg:w-[81%]"
          className=" px-5 py-4 w-full border-none outline-none h-10 lg:h-[52px]"
          placeholder="Search for help... (e.g., payment plan,  tecnical issues)"
          onChange={() => console.log("Jose")}
        />

        <button className="min-w-[163px] bg-[#991B1B] text-white h-10 lg:h-[52px] mt-4 lg:mt-0">
          Search
        </button>
      </div>
    </div>
  );
};

export default HelpHero;
