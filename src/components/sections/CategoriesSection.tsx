"use client";

const categories = [
  "Technology",
  "Sports",
  "Politics",
  "Entertainment",
  "Business",
  "Health",
];

const CategoriesSection = () => (
  <section className="mt-20 text-center">
    <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((cat) => (
        <button
          key={cat}
          className="px-5 py-2 rounded-full border dark:border-gray-700 hover:bg-indigo-600 hover:text-white transition"
        >
          {cat}
        </button>
      ))}
    </div>
  </section>
);

export default CategoriesSection;
