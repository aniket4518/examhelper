
import { useUploadedFilesStore } from "../hooks/zustand/handeluploads";
import React from "react";

// If you use a classnames utility, import it. Otherwise, use a simple join.
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export function ShowFilesList() {
  const { files, removeFile } = useUploadedFilesStore();
  return (
    <div className="relative w-full mt-10 max-w-xl mx-auto">
      {files.length > 0 ? (
        files.slice(0, 3).map((file: any, idx: number) => (
          <div
            key={"file" + idx}
            className={cn(
              "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
              "shadow-sm"
            )}
          >
            <div className="flex w-full justify-between items-center">
              <span>{file.name || String(file)}</span>
              <button
                className="text-red-500 hover:text-red-700 text-xl font-bold ml-4"
                title="Remove file"
                onClick={() => removeFile(idx)}
              >
                &#10006;
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No files uploaded.</div>
      )}
    </div>
  );
}