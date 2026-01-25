import { useCollapseStore } from "../../hooks/zustand/CheckCollapsestate";
import ShinyText, { Shiny } from '../ui/ShinyText'; 
import { SparklesPreview } from "./sparkelpriview";
import TextType from '../ui/TextType';
import {useUploadedFilesStore} from "../../hooks/zustand/handeluploads"
import { Button } from "../../../../packages/ui/src/button";
import { BiSend } from "react-icons/bi";
import { BsSendDashFill } from "react-icons/bs";
type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export default function ChatInterface(){
  const {hasFile}= useUploadedFilesStore()
const { collapseNavbar, toggleCollapseNavbar,collapseStudio } = useCollapseStore();
function click(){


} 
let collapse =7
if(collapseNavbar && !collapseStudio) collapse=8
if(collapseStudio &&!collapseNavbar) collapse=9
    return(
     
    <div  className={`justify-center   h-full justify align   col-span-${collapse}`}>
       <ShinyText
  text="✨Talk to Ai"
  speed={2}
  delay={0}
  color="#8bc3db"
  shineColor="#000000"
  spread={120}
  direction="left"
  yoyo={false}
  pauseOnHover={false}
  disabled={false}
   
/> 
<div className="w-full h-3/4 flex flex-col items-center justify-center">
<TextType className="text-lg"
        text={["welcome to cramp spot", "upload to start", "Happy learning!"]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="_"
        deletingSpeed={50}
        cursorBlinkDuration={0.5}
        variableSpeed={false}
        onSentenceComplete={() => {}}  
      />
  <SparklesPreview/>
  <div className="w-3/5 h-20 ml-4 rounded-lg border-3   inset-shadow-sm inset-shadow-cyan-500/50 flex  ">  
  <input className="w-7/8 h-full  p-3 border-0 focus:outline-none focus:ring-0 justfy-self-center" />
  <Button className="w-1/8 h-3/4 justify-items-center self-center"
    handelonclick={click}
> 
   <BsSendDashFill />
  </Button>
  </div>
</div>
 
    </div>
)
}
 
 