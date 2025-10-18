"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

import TagInput from "@/components/create-post/TagInput";
import ImageUploader from "@/components/create-post/ImageUploader";
import CategorySelect from "@/components/create-post/CategorySelect";

// 🚀 Dynamically import EditorSection (no SSR)
const EditorSection = dynamic(
  () => import("@/components/create-post/EditorSection"),
  { ssr: false }
);

export default function CreatePostPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("News");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [editorRef, setEditorRef] = useState<any>(null);

  const router = useRouter();

  // 🔒 Verify admin (you can uncomment this when needed)
  // useEffect(() => {
  //   try {
  //     const cookieString = document.cookie
  //       .split("; ")
  //       .find((row) => row.startsWith("token="));

  //     if (!cookieString) {
  //       toast.error("Not permitted for such action");
  //       router.push("/blog");
  //       return;
  //     }

  //     const token = cookieString.split("=")[1];
  //     const decoded = jwtDecode<{ role?: string }>(token);

  //     if (decoded.role !== "ADMIN") {
  //       toast.error("Not permitted for such action");
  //       router.push("/blog");
  //       return;
  //     }

  //     setIsAdmin(true);
  //   } catch (err) {
  //     console.error("Invalid token:", err);
  //     toast.error("Invalid or expired session");
  //     router.push("/blog");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const editorData = await editorRef?.save();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        toast.error("Session expired. Please login again.");
        router.push("/login");
        return;
      }

      const postData = { title, category, tags, image, content: editorData };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Failed to create post");
      }

      toast.success("Post created successfully!");
      setTitle("");
      setTags([]);
      setImage(null);
      router.push("/blog");
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast.error(error.message || "Error creating post");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create Post</h1>
      <p className="text-gray-700 text-center mb-7">
        Welcome, Admin! You can create posts here.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-md p-3 
          focus:ring focus:ring-blue-300 dark:bg-gray-700 "
          required
        />

        <CategorySelect category={category} setCategory={setCategory} />
        <TagInput tags={tags} setTags={setTags} />
        <ImageUploader image={image} setImage={setImage} />
        <EditorSection setEditorRef={setEditorRef} />

        <button
          type="submit"
          className="bg-red-600 text-white rounded-md p-3 hover:bg-red-700 transition"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}
