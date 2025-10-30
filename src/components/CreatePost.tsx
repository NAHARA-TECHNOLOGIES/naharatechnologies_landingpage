"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { UploadCloud, Loader2 } from "lucide-react";

import TagInput from "@/components/create-post/TagInput";
import CategorySelect from "@/components/create-post/CategorySelect";

const EditorSection = dynamic(() => import("@/components/create-post/EditorSection"), {
  ssr: false,
});

async function resizeImageFileToDataUrl(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Not an image file"));
      return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (ev) => {
      if (!ev.target) return reject(new Error("FileReader error"));
      img.src = ev.target.result as string;
    };

    img.onload = () => {
      let { width, height } = img;
      const aspect = width / height;
      if (width > maxWidth || height > maxHeight) {
        if (aspect > 1) {
          width = maxWidth;
          height = Math.round(maxWidth / aspect);
        } else {
          height = maxHeight;
          width = Math.round(maxHeight * aspect);
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Image conversion failed"));
          const br = new FileReader();
          br.onload = () => resolve(br.result as string);
          br.onerror = () => reject(new Error("Reading blob failed"));
          br.readAsDataURL(blob);
        },
        "image/jpeg",
        quality
      );
    };

    reader.onerror = () => reject(new Error("FileReader error"));
    reader.readAsDataURL(file);
  });
}

export default function CreatePostPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("News");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [editorRef, setEditorRef] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    try {
      const cookieString = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));

      if (!cookieString) {
        toast.error("Not permitted for such action");
        router.push("/blog");
        return;
      }

      const token = cookieString.split("=")[1];
      const decoded = jwtDecode<{ role?: string }>(token);

      if (decoded.role !== "ADMIN") {
        toast.error("Not permitted for such action");
        router.push("/blog");
        return;
      }

      setIsAdmin(true);
    } catch (err) {
      console.error("Invalid token:", err);
      toast.error("Invalid or expired session");
      router.push("/blog");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are supported");
      return;
    }

    try {
      const optimizedDataUrl = await resizeImageFileToDataUrl(file, 1200, 1200, 0.8);
      setImage(optimizedDataUrl);
      toast.success("Image optimized and ready!");
    } catch {
      toast.error("Failed to process image");
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are supported");
      return;
    }

    try {
      const optimizedDataUrl = await resizeImageFileToDataUrl(file, 1200, 1200, 0.8);
      setImage(optimizedDataUrl);
      toast.success("Image optimized and ready!");
    } catch {
      toast.error("Failed to process image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

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

      if (!res.ok) throw new Error(await res.text());
      toast.success("Post created successfully!");
      router.push("/blog");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error creating post");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Verifying access...
      </div>
    );

  if (!isAdmin) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 min-h-screen"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 sm:p-10 space-y-8"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              ✍️ Create a New Post
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome, Admin! Craft and publish your next story.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Post Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 
                focus:ring-2 focus:ring-red-800 focus:border-red-800 dark:bg-gray-700 dark:text-white"
                placeholder="Enter a captivating post title"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <CategorySelect category={category} setCategory={setCategory} />
              <TagInput tags={tags} setTags={setTags} />
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`rounded-xl border-2 border-dashed p-8 text-center transition-all ${
                dragActive
                  ? "border-red-400 bg-red-50 dark:bg-gray-700/50"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileSelect}
                hidden
              />
              {image ? (
                <div className="relative">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="rounded-lg w-full max-h-72 object-cover shadow-sm"/>
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute top-3 right-3 bg-black/60 text-white rounded-full px-3 py-1 text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300"
                >
                  <UploadCloud className="w-12 h-12 mb-3 text-red-600" />
                  <span className="font-medium text-sm">
                    Drag & drop or click to upload image
                  </span>
                </label>
              )}
            </div>

            <EditorSection setEditorRef={setEditorRef} />

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={submitting}
              className="w-full bg-red-800 text-white rounded-lg py-3 font-semibold text-lg hover:bg-red-900 transition flex items-center justify-center disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Post"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
