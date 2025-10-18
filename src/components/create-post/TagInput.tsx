"use client";

import { useState } from "react";

export default function TagInput({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [currentTag, setCurrentTag] = useState("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add tags (press Enter)"
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
        onKeyDown={handleAddTag}
        className="border border-gray-300 dark:border-gray-700 rounded-md p-3 w-full dark:bg-gray-700"
      />
      <div className="flex flex-wrap gap-2 mt-2 ">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center"
          >
            #{tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
