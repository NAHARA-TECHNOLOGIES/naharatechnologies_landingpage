"use client";

import React from "react";
import { motion } from "framer-motion";

const TitleDescription = ({
  className,
  title,
  titleStyle,
  desc,
  descStyle,
  headerNumber,
  titleAnimProps,
  descAnimProps,
  containerAnimProps,
}: {
  className?: string;
  title: string | React.ReactNode;
  titleStyle: string;
  desc?: string;
  descStyle?: string;
  headerNumber?: number;
  titleAnimProps?: any;
  descAnimProps?: any;
  containerAnimProps?: any;
}) => {
  const displayTitle = () => {
    switch (headerNumber) {
      case 2:
        return (
          <motion.h2 {...titleAnimProps} className={titleStyle}>
            {title}
          </motion.h2>
        );
      case 3:
        return (
          <motion.h3 {...titleAnimProps} className={titleStyle}>
            {title}
          </motion.h3>
        );
      default:
        return (
          <motion.h1 {...titleAnimProps} className={titleStyle}>
            {title}
          </motion.h1>
        );
    }
  };

  return (
    <motion.div {...containerAnimProps} className={className}>
      {displayTitle()}
      <motion.p {...descAnimProps} className={descStyle}>
        {desc}
      </motion.p>
    </motion.div>
  );
};

export default TitleDescription;
