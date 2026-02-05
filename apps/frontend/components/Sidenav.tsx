"use client"
import { useState } from "react";
import { Button } from "../../../packages/ui/src/button";
import { FaChevronLeft, FaChevronRight, FaFileUpload } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { Uploadfile } from "./uploadfile";
import { useCollapseStore } from "../hooks/zustand/CheckCollapsestate";
import { useUploadedFilesStore } from "../hooks/zustand/handeluploads"
import Nodocs from "./noducenmt"
import { useUploadStore } from "../hooks/zustand/UploadState"
import Logo from "./Logo";
import { ShowFilesList } from "./fileslisst"

export default function Sidenav() {
  const { collapseNavbar, toggleCollapseNavbar } = useCollapseStore();
  const hasFile = useUploadedFilesStore(s => s.files.length > 0)
  const { showUpload, setUpload } = useUploadStore()

  return (
    <div
      className={`h-screen text-neutral-100 transition-all duration-300 ${collapseNavbar ? "col-span-1" : "col-span-2"} relative sidebar-gradient`}
    >
      <Logo />
      {/* upload button */}
      <div className="flex justify-center w-full mt-8 px-3">
        <Button
          className={`flex items-center justify-center rounded-lg transition-all duration-200 font-medium
            ${collapseNavbar ? "w-11 h-11" : "px-5 h-11 w-full"}
            ${showUpload
              ? "bg-neutral-800 border border-neutral-600 text-neutral-100"
              : "btn-ghost"
            }
          `}
          handelonclick={() => setUpload(true)}
        >
          {(collapseNavbar ? <LuUpload className="text-base" /> : <><LuUpload className="mr-2" /> Add Resources</>)}
        </Button>
      </div>

      {/* Show file list or no docs */}
      <div className="mt-8 px-3 w-full">
        {hasFile ? <ShowFilesList /> : <Nodocs />}
      </div>
    </div>
  );
}