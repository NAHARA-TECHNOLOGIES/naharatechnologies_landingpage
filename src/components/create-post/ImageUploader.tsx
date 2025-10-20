"use client";

import Image from "next/image";

export default function ImageUploader({
  image,
  setImage,
}: {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {image ? (
        <div className="relative w-full">
          <Image
            src={image}
            alt="Preview"
            className="w-full rounded-lg shadow-md"
          />
          <button
            type="button"
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 bg-red-600 text-white px-2
             py-1 rounded-md hover:bg-red-700 text-sm"
          >
            Remove
          </button>
        </div>
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-300 rounded-md p-3 w-full cursor-pointer"
        />
      )}
    </div>
  );
}
