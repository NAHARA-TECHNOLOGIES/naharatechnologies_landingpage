import { faqs } from "@/constants";
import { useState } from "react";
import { BiUpArrow } from "react-icons/bi";

const HelpFAQ = () => {
  const [_faqs, setFaqs] = useState(faqs);

  const openAnswer = (question: string) => {
    setFaqs((prev) => {
      return prev.map((faq) =>
        faq.question === question ? { ...faq, isShowing: !faq.isShowing } : faq
      );
    });
  };
  return (
    <div className="p-6 lg:py-10 lg:px-[183px]">
      <h2 className="section-title max-w-[683px] mx-auto">
        Frequently Asked Questions About Nahara Tecknologies
      </h2>

      <div className="mt-[34px] md:flex justify-between">
        <div className="w-full md:w-[45%] min-h-[300px] lg:h-[428px] help-faq-bg rounded-[10px]" />

        <div className="w-full md:w-[46%] flex flex-col justify-between mt-10 md:mt-0">
          {_faqs.map(({ question, answer, isShowing }, index) => (
            <div
              key={question + index}
              className="border-b border-0.5 border-gray-500 py-5"
            >
              <p
                className="md:text-lg flex items-center cursor-pointer"
                onClick={() => openAnswer(question)}
              >
                {question} <BiUpArrow className={`ml-4 ${isShowing && 'rotate-180'}`} size={16} />
              </p>

              {isShowing && (
                <div>
                  <p>{answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpFAQ;
