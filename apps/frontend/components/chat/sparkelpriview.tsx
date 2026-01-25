"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles"; 
import { Button } from "../../../../packages/ui/src/button";
 import {useUploadStore} from "../../hooks/zustand/UploadState"

export function SparklesPreview() {
    const {showUpload,setUpload} =useUploadStore()
    
  return (
    <div className="h-3/4 w-full flex flex-col items-center justify-center overflow-hidden rounded-md  ">
       
      <div className="w-[40rem] h-40 relative flex flex-col items-center justify-center">
        {/* Gradients - swap to lighter shades for dark bg */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-200 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-300 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-cyan-100 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-cyan-100 to-transparent h-px w-1/4" />

        {/* Upload Button absolutely positioned just above sparklescore */}
        <Button
          className="absolute left-1/2 -translate-x-1/2 top-10 border flex items-center justify-center transition-all text-xl duration-300 bg-black/60 text-white hover:custom-radial-bg h-10 w-30 rounded-lg font-bold z-10"
          handelonclick={setUpload}
        >
          Upload
        </Button>

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1400}
          particleColor="#759b28"
          className="w-full h-full"
        />

        {/* Radial Gradient to prevent sharp edges - swap to white bg and black mask */}
        <div className="absolute inset-0 w-full h-full bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,black)]"></div>
      </div>
    </div>
  );
}