"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";
import { Button } from "../../../../packages/ui/src/button";
import { useUploadStore } from "../../hooks/zustand/UploadState"

export function SparklesPreview() {
  const { showUpload, setUpload } = useUploadStore()

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-md py-8">
      <div className="w-[40rem] h-48 relative flex flex-col items-center justify-center">
        {/* Subtle line accents */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-px w-3/4" />

        {/* Content */}
        <h2 className="relative text-xl font-medium text-neutral-200 mb-6 z-10">
          Add a resource to get started
        </h2>

        <Button
          className="relative btn-primary px-6 py-2.5 rounded-lg text-sm font-medium z-10"
          handelonclick={() => setUpload(true)}
        >
          Upload
        </Button>

        {/* Sparkles - more subtle */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={400}
          particleColor="#525252"
          className="w-full h-full absolute inset-0"
        />

        {/* Gradient mask */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black via-transparent to-black pointer-events-none"></div>
      </div>
    </div>
  );
}