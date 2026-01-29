import { FiFilePlus } from "react-icons/fi"
import {useUploadedFilesStore} from "../hooks/zustand/handeluploads"
export default function Nodocs(){
    const {files,hasFile}=useUploadedFilesStore()
return(
    <div className="mt-15 grid grid-row-2 justify-items-center font-sm text-sm ">
        <FiFilePlus className="text-4xl"/>
       <h1 className="w-3/4 mt-5">
         Saved sources will appear here
         Click Add source above to add PDFs, text or images files. 
       </h1>
    </div>
)
}