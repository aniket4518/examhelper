 "use client"
import Sidenav from "../components/Sidenav";
 import {Uploadfile} from "../components/uploadfile"
 import {useUploadStore} from "../hooks/zustand/UploadState"
 import ChatInterface from "../components/chat/Chatinterfrace"
 import Studio from "../components/studio/studio"
export default function Home() {
  const {showUpload,setUpload} =useUploadStore()
  return (
        <div className="min-h-screen custom-radial-bg grid grid-cols-12 gap-1"> 
        <Sidenav/>
        {/* <ChatInterface/> */}
         { showUpload? <Uploadfile />: <ChatInterface/>}
         <Studio></Studio>
       </div>
  );
}
