"use client";
import React from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "../../../packages/ui/src/button";
import { IoClose } from "react-icons/io5";
import { useUploadStore } from "../hooks/zustand/UploadState"
import { useUploadedFilesStore } from "../hooks/zustand/handeluploads"
import { api } from "@/lib/api";

export function Uploadfile() {
  const { addFiles, clearFiles, files } = useUploadedFilesStore();
  const { setUpload, showUpload } = useUploadStore();

  if (!showUpload) return null;

  // Handle file upload and close panel
  const handleFilesAdded = (files: File[]) => {
    addFiles(files);
    // Close upload panel after files are added
    if (files.length > 0) {
      setUpload(false);
    }
  };
  const handelcross = () => {
    clearFiles()
    setUpload(false)

  }
  const handelsave = () => {
    setUpload(false)
    uploadtoserver(files)
  }
  const uploadtoserver = async (files: File[]) => {
    const formData = new FormData();

    // Append each file - 'files' must match multer field name on backend
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(api("/uploads"), {
        method: "POST",
        body: formData,
        // Don't set Content-Type - browser sets it automatically with boundary
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      console.log('Upload successful:', data);
    } catch (error) {
      console.error('Upload error:', error);
    }
  }
  return (
    <div className="col-span-6 col-start-3 flex items-center justify-center">
      <div className="glass-card rounded-xl w-full max-w-2xl mx-8 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-neutral-800">
          <h3 className="text-base font-medium text-neutral-200">Upload Resources</h3>
          <Button
            className="w-9 h-9 rounded-lg btn-ghost flex items-center justify-center hover:bg-neutral-800 group transition-all duration-200"
            handelonclick={handelcross}
          >
            <IoClose className="text-lg text-neutral-400 group-hover:text-neutral-200" />
          </Button>
        </div>

        {/* Upload area */}
        <div className="p-5">
          <FileUpload onChange={handleFilesAdded} />
          <Button
            className="relative btn-primary px-6 py-2.5 rounded-lg text-sm font-medium z-10"
            handelonclick={handelsave}
          >
            save
          </Button>
        </div>
      </div>
    </div>
  );
}