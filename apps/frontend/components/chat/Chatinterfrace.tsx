import { useCollapseStore } from "../../hooks/zustand/CheckCollapsestate";
import ShinyText, { Shiny } from '../ui/ShinyText'; 
import { SparklesPreview } from "./sparkelpriview";
import TextType from '../ui/TextType';
import {useUploadedFilesStore} from "../../hooks/zustand/handeluploads"
import { Button } from "../../../../packages/ui/src/button"; 
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
  const isdisabled= hasFile? false : true
const { collapseNavbar, toggleCollapseNavbar,collapseStudio } = useCollapseStore();
function click(){
 

} 
 
// if(collapseNavbar && !collapseStudio) collapse=8
// if(collapseStudio &&!collapseNavbar) collapse=9
    // Determine col-span class based on collapse states
    let colSpanClass = "col-span-7";
    if (collapseNavbar && !collapseStudio) colSpanClass = "col-span-8";
    else if (collapseStudio && !collapseNavbar) colSpanClass = "col-span-9";
    else if (collapseNavbar && collapseStudio) colSpanClass = "col-span-10";

    return(
    <div className={`justify-center h-full justify align ${colSpanClass}`}>
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
{/* <TextType className="text-lg"
        text={["welcome to cramp spot", "upload to start", "Happy learning!"]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="_"
        deletingSpeed={50}
        cursorBlinkDuration={0.5}
        variableSpeed={false}
        onSentenceComplete={() => {}}  
      /> */}
  <SparklesPreview/>
  <div className="w-3/5 h-1/4 ml-4 rounded-lg border-3 inset-shadow-sm inset-shadow-slate-500/50 flex items-center">
    <textarea disabled={isdisabled}
      className="w-7/8 p-3 border-0 focus:outline-none focus:ring-0 justify-self-center resize-none min-h-[70px] max-h-[60px] overflow-y-scroll scrollbar-hide"
      rows={2}
      placeholder="Type your message..."
    />
    <Button className="w-1/8 h-3/4 justify-items-center self-center" handelonclick={click}>
      <BsSendDashFill />
    </Button>
  </div>
</div>
 
    </div>
)
}
 
 