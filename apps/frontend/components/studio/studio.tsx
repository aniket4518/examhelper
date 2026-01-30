import { useCollapseStore } from "../../hooks/zustand/CheckCollapsestate"
import { Button } from "../../../../packages/ui/src/button"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Tools from "./Tools";

export default function Studio() {
     const { collapseStudio, toggleCollapseStudio } = useCollapseStore();
     return (
          <div className={`h-full glass-dark ${collapseStudio ? "col-end-13 col-span-1" : "col-end-13 col-span-3"} transition-all duration-300 relative`}>
               {/* Toggle button */}
               <Button
                    className="absolute right-3 top-3 p-2 w-9 h-9 flex items-center justify-center rounded-lg btn-ghost transition-all duration-200 z-10"
                    handelonclick={toggleCollapseStudio}
               >
                    {collapseStudio ? (
                         <FaChevronLeft className="text-sm text-neutral-400" />
                    ) : (
                         <FaChevronRight className="text-sm text-neutral-400" />
                    )}
               </Button>

               <Tools />
          </div>
     )
}