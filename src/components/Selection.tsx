import React from "react";

type SelectionItem =
  | string
  | {
      key: string;
      title: string;
      [key: string]: any;
    };

interface SelectionProps {
  selections?: SelectionItem[];
  displaySelections: (selections?: SelectionItem[]) => React.ReactNode;
}

const Selection: React.FC<SelectionProps> = ({
  selections = [],
  displaySelections,
}) => {
  return (
    <div className="w-full sticky top-[65px] z-40 py-4 px-4 overflow-hidden">
      <div className="flex gap-3 overflow-x-auto no-scrollbar justify-start w-full max-w-[1280px] mx-auto">
        {displaySelections(selections)}
      </div>
    </div>
  );
};

export default Selection;
