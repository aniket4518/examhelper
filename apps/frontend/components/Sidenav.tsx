"use client"
import { useState } from "react";
import { Button } from "../../../packages/ui/src/button";
import { FaChevronLeft, FaChevronRight, FaFileUpload } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { Uploadfile } from "./uploadfile";
import { useCollapseStore } from "../hooks/zustand/CheckCollapsestate";
import Nodocs from "./noducenmt"
 import {useUploadStore} from "../hooks/zustand/UploadState"
import Logo from "./Logo";

export default function Sidenav() {
  const { collapseNavbar,  toggleCollapseNavbar } = useCollapseStore();

   const {showUpload,setUpload} =useUploadStore()

  return (
    <div
      className={`h-screen text-black transition-all duration-300 ${collapseNavbar ? "col-span-1" : "col-span-2"} relative border-r-1   justify-items-center`}
    >
      <Logo/>
      
      {/* upload button */}
      <div className="absolute w-full h-auto justify-items-center"> 
      <Button
        className={`p-1 border flex items-center rounded-sm justify-center transition-all duration-300  relative top-20
          ${collapseNavbar ? "max-w-7/8 h-8 w-10" : "max-w-7/8 h-12 w-35"}
          ${showUpload ? "bg-gradient-to-r from-teal-100 to-lime-200" : "bg-white hover:bg-gradient-to-r hover:from-teal-100 hover:to-lime-200"}
        `}
        handelonclick={setUpload}
      >
        { (collapseNavbar ? <LuUpload /> : "Add Resources")}
      </Button>
    
      <Nodocs/>
       </div>
    </div>
  );
}