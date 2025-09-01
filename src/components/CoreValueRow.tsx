import React from "react";
import ValueCard from "./ValueCard";
import {
  FaCheckCircle,
  FaHeart,
  FaLeaf,
  FaThumbsUp,
  FaUserFriends,
} from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";

const valueIcon: { [key: string]: (color: string) => React.JSX.Element } = {
  integrity: (color: string) => <FaCheckCircle color={color} />,
  dedication: (color: string) => <FaThumbsUp color={color} />,
  excellence: (color: string) => <FaHeart color={color} />,
  "customer focus": (color: string) => <FaUserFriends color={color} />,
  accountability: (color: string) => <BsShieldCheck />,
  innovation: (color: string) => <FaLeaf />,
};

const CoreValueRow = ({
  values,
  className,
}: {
  className: string;
  values: {
    id: number;
    title: string;
    text: string;
    iconColor: string;
  }[];
}) => {
  return (
    <div className={`lg:flex items-stretch lg:my-6 ${className}`}>
      {values.map(({ id, title, text, iconColor }) => (
        <ValueCard
          className="bg-[#feecea] p-6 rounded-3xl w-full lg:max-w-[250px] shadow-2xl my-5 lg:my-0"
          key={id}
          icon={valueIcon[title](iconColor)}
          title={title}
          text={text}
        />
      ))}
    </div>
  );
};

export default CoreValueRow;
