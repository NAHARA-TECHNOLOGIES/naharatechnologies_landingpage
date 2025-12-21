import Image from "next/image";
import TitleDescription from "@/components/TitleDescription";
import ourStoryImg from "@/public/images/ourstory.jpg";
import howWeWorkImg from "@/assets/how-we-work.png";

const OurStory = () => {
  return (
    <div
      className="px-6 py-10 md:py-20 lg:px-[105px] 
      text-gray-900 dark:text-gray-100"
    >
      <div className="container">
        <TitleDescription
          title="Our Story"
          className="text-center"
          titleStyle="text-h2"
          desc="Where ideas meet execution, and vision becomes reality."
          descStyle="mt-2 hidden lg:block text-bodyLarge text-gray-500"
          headerNumber={1}
          titleAnimProps={{
            initial: { y: -50, opacity: 0 },
            whileInView: { y: 0, opacity: 1 },
          }}
          descAnimProps={{
            initial: { y: -150, opacity: 0 },
            whileInView: {
              y: 0,
              opacity: 1,
              transition: { delay: 0.5 },
            },
          }}
        />

        <div className="mt-16 space-y-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
           

            {/* Text */}
            <div className="lg:w-1/2 w-full">
              {/* <h2 className="text-h3 relative inline-block text-darkText dark:text-white">
                Building African Brilliance Through Technology
                <span className="absolute left-0 -bottom-1 h-1 bg-brandRed animate-underline w-0"></span>
              </h2> */}

              <div className="mt-6 space-y-5 text-bodyLarge leading-relaxed text-gray-600 dark:text-gray-300">
                <p>
                  Nahara Technologies was born from a simple belief: African
                  businesses and brands deserve to thrive in a fast-evolving
                  digital world. We saw the gap between great ideas and their
                  execution—where many brilliant concepts struggle to reach the
                  market because the journey feels complex or overwhelming.
                </p>

                <p>
                  Our purpose became clear: to bridge the gap between vision and
                  reality. From refining ideas and conducting market research to
                  building digital products and strong online presences, we
                  guide businesses through every stage of growth with clarity
                  and intention.
                </p>

                <p>
                  At the heart of Nahara Technologies is a commitment to
                  excellence, creativity, and human-centered innovation. We do
                  more than build technology—we craft experiences, tell
                  meaningful stories, and create solutions that empower
                  businesses to succeed locally and globally.
                </p>
              </div>
            </div>

             {/* Image */}
             <div className="lg:w-1/2 w-full">
              <Image
                src={howWeWorkImg}
                alt="Nahara Technologies team collaborating"
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
