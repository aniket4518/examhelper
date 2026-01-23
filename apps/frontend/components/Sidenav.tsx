"use client"
import { useState } from "react";
import { Button } from "../../../packages/ui/src/button";
import { FaChevronLeft, FaChevronRight, FaFileUpload } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { Uploadfile } from "./uploadfile";
import { useCollapseStore } from "../hooks/zustand/CheckCollapsestate";
 import {useUploadStore} from "../hooks/zustand/UploadState"

export default function Sidenav() {
  const { collapse, toggleCollapse } = useCollapseStore();

   const {showUpload,setUpload} =useUploadStore()

  return (
    <div
      className={`h-screen text-black bg-red-50/20 transition-all duration-300 ${
        collapse ? " col-span-1" : "col-span-2"
      } flex flex-col relative border-r-1  items-center `}
    >
      {/* collapse button */}
      <Button
        className={`mt-2 mb-4 p-1 border h-10 w-10 flex items-center justify-center bg-slate-100 rounded-md  transition-all duration-300 absolute right-2 top-1 `}
        handelonclick={toggleCollapse}
      >
        {collapse ? <FaChevronRight /> : <FaChevronLeft />}
      </Button>
      {/* upload button */}
      <Button
        className={`p-1 border flex items-center justify-center transition-all duration-300 absolute top-20 hover:custom-radial-bg  ${
          collapse ? "max-h-20 h-10 w-10 " : "max-h-20 h-20 w-35"
        }`}
        handelonclick={setUpload}
      >
        {collapse ? <LuUpload /> : "Add Resources"}
      </Button>
      {/* Optionally render Uploadfile component if showUpload is true */}
       
    </div>
  );
}