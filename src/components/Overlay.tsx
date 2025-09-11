import React from "react";

const Overlay = ({
  className,
  children,
}: {
  className: string;
  children?: React.ReactNode;
}) => {
  return <div className={`absolute ${className}`}>{children && children}</div>;
};

export default Overlay;
