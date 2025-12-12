import Overlay from "@/components/Overlay";
import HelpSearchBar from "@/components/HelpSearchBar";
import TitleDescription from "@/components/TitleDescription";

const HelpHero = () => {
  return (
    <div className="min-h-[450px] lg:min-h-[786px] relative help-hero-bg py-10 px-6 lg:pt-[216px] lg:pb-[280px] flex flex-col justify-center">
      <Overlay className="inset-0 bg-[#3309099C] z-10" />

      <div className="relative z-20 text-center text-white w-full max-w-[945px] mx-auto">
        <h3 className="text-h3">Welcome to Help Center</h3>

        <TitleDescription
          // className="border"
          title="How Can We Help You?"
          desc="Get quick answers, explore our knowledge base, or connect with our support team—anytime, anywhere."
          titleStyle=""
          descStyle="w-full max-w-[541px] mx-auto text-white text-bodyLarge text-gray-500 leading-relaxed tracking-normal mt-1"
        />
      </div>

      <div className="relative z-20 mt-[46px] w-full max-w-[945px] flex flex-col md:flex-row justify-between mx-auto">
        <HelpSearchBar
        showIcon={false}
        containerClassName="w-full md:w-[81%]"
        className="px-5 py-4 w-full border-none outline-none h-10 lg:h-[52px]"
        placeholder="Search for help... (e.g., payment plan, technical issues)"
        onChange={() => console.log("Jose")}
      />


        <button className="w-full md:w-[17%] btn-primary h-10 lg:h-[52px] mt-4 md:mt-0">
          Search
        </button>
      </div>
    </div>
  );
};
// #991B1B
export default HelpHero;
