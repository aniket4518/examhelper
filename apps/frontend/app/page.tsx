 "use client"
import Sidenav from "../components/Sidenav";
 import {Uploadfile} from "../components/uploadfile"
 import {useUploadStore} from "../hooks/zustand/UploadState"
 import ChatInterface from "../components/chat/Chatinterfrace"
export default function Home() {
  const {showUpload,setUpload} =useUploadStore()
  return (
        <div className="min-h-screen custom-radial-bg inline-grid grid-cols-12 gap-4 flex items-center"> 
        <Sidenav/>
        <ChatInterface/>
         { showUpload && <Uploadfile />}
       </div>
  );
}
