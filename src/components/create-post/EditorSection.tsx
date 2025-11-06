"use client";

import { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";

export default function EditorSection({
  setEditorRef,
}: {
  setEditorRef: (instance: EditorJS) => void;
}) {
  useEffect(() => {
    let editor: EditorJS | null = null;

    const initEditor = async () => {
      if (typeof window === "undefined") return;

      const instance = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        placeholder: "Write your post content here...",
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          embed: {
            class: Embed,
            inlineToolbar: false,
            config: {
              services: {
                youtube: true,
                twitter: true,
                instagram: true,
                vimeo: true,
                tiktok: true,
                coub: true,
              },
            },
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/fetchUrlMeta", // optional link preview endpoint
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile(file: File) {
                  return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      resolve({
                        success: 1,
                        file: { url: reader.result },
                      });
                    };
                    reader.readAsDataURL(file);
                  });
                },
              },
            },
          },
        },
        onReady: () => {
          console.log("Editor.js is ready");
        },
      });

      editor = instance;
      setEditorRef(instance);
    };

    initEditor();

    return () => {
      if (editor && typeof editor.destroy === "function") {
        editor.destroy();
        editor = null;
      }
    };
  }, [setEditorRef]);

  return (
    <div className="w-full">
      <label className="block mb-2 font-semibold">Post Content</label>
      <div
        id="editorjs"
        className="
          border border-gray-300 
          p-4 rounded-md 
          bg-white dark:bg-gray-800 
          shadow-sm 
          min-h-[300px] 
          w-full
          overflow-hidden
          editor-wrapper
        "
      />

      <style jsx global>{`
        /* 🔹 Make embeds and images responsive */
        .editor-wrapper iframe,
        .editor-wrapper video,
        .editor-wrapper img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }

        /* 🔹 Better spacing for mobile */
        @media (max-width: 640px) {
          .editor-wrapper {
            padding: 0.75rem;
          }
        }

        /* 🔹 Ensure embed previews fit container */
        .ce-block__content {
          max-width: 100%;
        }
        .ce-block {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
