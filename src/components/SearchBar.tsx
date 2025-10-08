"use client";
import { FiSearch } from "react-icons/fi";

type SearchBarProps = {
  placeholder: string;
  className?: string;
  containerClassName?: string;
  showIcon?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({
  placeholder,
  className,
  containerClassName = "relative mb-6 ",
  showIcon = true,
  onChange,
}: SearchBarProps) => {
  return (
    <div className={containerClassName}>
      {showIcon && <FiSearch className="absolute left-3 top-3 text-gray-400" />}

      <input
        type="text"
        placeholder={placeholder}
        className={className ?? "border w-full pl-10 p-3 rounded-md"}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
