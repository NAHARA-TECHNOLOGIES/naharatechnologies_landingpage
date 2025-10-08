"use client";

import React from "react";
import Lottie from "lottie-react";

const LottieAnim = ({
  className,
  lottieFile,
  animClass,
}: {
  className: string;
  lottieFile: any;
  animClass?: string;
}) => {
  return (
    <div className={className}>
      <Lottie animationData={lottieFile} className={animClass} />
    </div>
  );
};

export default LottieAnim;
