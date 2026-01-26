import {useUploadedFilesStore} from "../hooks/zustand/handeluploads"
export default function Nodocs(){
    const {files,hasFile}=useUploadedFilesStore()
return(
    <div className="relative top-22">
       <h1>
         Saved sources will appear here
         Click Add source above to add PDFs, websites, text, videos, or audio files. 
       </h1>
    </div>
)
}