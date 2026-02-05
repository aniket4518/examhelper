"use client";

import { useUploadedFilesStore } from "../hooks/zustand/handeluploads";
import React from "react";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function ShowFilesList() {
  const { files, removeFile } = useUploadedFilesStore();
  return (
    <div className="relative w-full mx-auto space-y-2">
      {files.length > 0 ? (
        files.slice(0, 3).map((file: any, idx: number) => (
          <div
            key={"file" + idx}
            className="glass-card rounded-lg p-3 card-hover cursor-pointer group"
          >
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-neutral-400 text-base">description</span>
                </div>
                <span className="text-sm text-neutral-300 font-medium truncate max-w-[120px]">
                  {file.name || String(file)}
                </span>
              </div>
              <button
                className="w-7 h-7 rounded-md bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-neutral-200 transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Remove file"
                onClick={() => removeFile(idx)}
              >
                <span className="text-base">×</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-neutral-600 text-sm">No files uploaded.</div>
      )}
    </div>
  );
}