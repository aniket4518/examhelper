import { useCollapseStore } from "../../hooks/zustand/CheckCollapsestate";
import ShinyText from '../ui/ShinyText';
import { SparklesPreview } from "./sparkelpriview";
import { useUploadedFilesStore } from "../../hooks/zustand/handeluploads"
import { Button } from "../../../../packages/ui/src/button";
import { BsSendDashFill } from "react-icons/bs";

export default function ChatInterface() {
  const { hasFile } = useUploadedFilesStore()
  const isdisabled = hasFile ? false : true
  const { collapseNavbar, toggleCollapseNavbar, collapseStudio } = useCollapseStore();

  function click() {
  }

  let colSpanClass = "col-span-7";
  if (collapseNavbar && !collapseStudio) colSpanClass = "col-span-8";
  else if (collapseStudio && !collapseNavbar) colSpanClass = "col-span-9";
  else if (collapseNavbar && collapseStudio) colSpanClass = "col-span-10";

  return (
    <div className={`flex flex-col h-full ${colSpanClass}`}>
      {/* Header with shiny animated text */}
      <div className="p-4">
        <ShinyText
          text="✨ Talk to AI"
          speed={2}
          delay={0.5}
          color="#737373"
          shineColor="#e5e5e5"
          spread={120}
          direction="left"
          yoyo={true}
          pauseOnHover={true}
          disabled={false}
          className="text-lg font-medium"
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <SparklesPreview />

        {/* Chat input */}
        <div className="w-full max-w-2xl mt-8">
          <div className="glass-card rounded-xl p-2 flex items-center gap-2">
            <textarea
              disabled={isdisabled}
              className="flex-1 p-4 bg-transparent border-0 focus:outline-none focus:ring-0 resize-none min-h-[60px] max-h-[120px] overflow-y-auto scrollbar-hide text-neutral-200 placeholder-neutral-500 text-sm"
              rows={2}
              placeholder={isdisabled ? "Upload a resource to start chatting..." : "Type your message..."}
            />
            <Button
              className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-200 ${isdisabled
                  ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                  : 'btn-primary'
                }`}
              handelonclick={click}
            >
              <BsSendDashFill className="text-base" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}