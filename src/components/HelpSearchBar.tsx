"use client";
import React from "react";

interface HelpSearchBarProps {
  showIcon?: boolean;
  containerClassName?: string;
  className?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HelpSearchBar: React.FC<HelpSearchBarProps> = ({
  showIcon = false,
  containerClassName = "",
  className = "",
  placeholder = "Search...",
  onChange,
}) => {
  return (
    <div className={`relative ${containerClassName}`}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className={`rounded-lg bg-white text-black placeholder-gray-500 ${className}`}
      />
      {showIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      )}
    </div>
  );
};

export default HelpSearchBar;
