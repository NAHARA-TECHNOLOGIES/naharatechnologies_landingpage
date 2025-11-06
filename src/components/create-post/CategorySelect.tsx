"use client";

export default function CategorySelect({
  category,
  setCategory,
}: {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-700 rounded-md p-3"
    >
      <option value="News">News</option>
      <option value="Sports">Sports</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Technology">Technology</option>
      <option value="Business">Business</option>
    </select>
  );
}
