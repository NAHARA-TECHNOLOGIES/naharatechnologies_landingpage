"use client";

import dynamic from "next/dynamic";
import React from "react";

const EditorSectionClient = dynamic(() => import("./EditorSectionClient"), {
  ssr: false,
  loading: () => (
    <div className="text-gray-500 text-sm italic p-3">Loading editor...</div>
  ),
});

export default function EditorSection({
  setEditorRef,
}: {
  setEditorRef: (instance: any) => void;
}) {
  return (
  <div className="w-full">
    <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">
      Post Content
    </label>
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
    >
      {/* Optional fallback text before editor loads */}
      <p className="text-gray-400 italic text-sm">
        Loading editor...
      </p>
    </div>

    <style jsx global>{`
      .editor-wrapper iframe,
      .editor-wrapper video,
      .editor-wrapper img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
      }

      @media (max-width: 640px) {
        .editor-wrapper {
          padding: 0.75rem;
        }
      }

      .ce-block__content {
        max-width: 100%;
      }
      .ce-block {
        margin-bottom: 1rem;
      }
    `}</style>
  </div>
);
;
}
