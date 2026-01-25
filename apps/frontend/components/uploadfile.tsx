"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "../../../packages/ui/src/button";
import { GiCrossedBones } from "react-icons/gi";
import {useUploadStore} from "../hooks/zustand/UploadState"
import {useUploadedFilesStore} from "../hooks/zustand/handeluploads"
export function Uploadfile() {
  
  const{files,setFiles,hasFile,clearFiles}= useUploadedFilesStore()
  const {setUpload,showUpload}=useUploadStore()
 
  if (!showUpload) return null;
  return (
    <div className="col-span-6 min-h-4/5 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg h-1/2  ml-20">
      <div className="flex justify-end">
        <Button
          className="w-10 h-10 rounded-lg bg-slate-100 place-content-center p-2"
          handelonclick={() => setUpload(false)}
        >
          <GiCrossedBones />
        </Button>
      </div>
      <FileUpload onChange={setFiles} />
    </div>
  );
}