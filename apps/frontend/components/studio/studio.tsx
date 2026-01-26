import  {useCollapseStore} from "../../hooks/zustand/CheckCollapsestate"
import {Button} from "../../../../packages/ui/src/button"
import { FaChevronLeft, FaChevronRight, FaFileUpload } from "react-icons/fa";
import Tools from "./Tools";
export default function Studio(){
     const { collapseStudio, toggleCollapseStudio } = useCollapseStore();
return(
     <div className={`  h-full ${collapseStudio ? "col-end-13 col-span-1" : "col-end-13 col-span-3"}`} >
          <Button
                className={`  mb-4 p-1 border h-10 w-10 flex items-center justify-center bg-slate-100 rounded-md  transition-all duration-300 absolute right-2 top-1 `}
                handelonclick={toggleCollapseStudio}
              >
                {collapseStudio ?<FaChevronLeft />: <FaChevronRight />}
              </Button>
        <Tools/>
     </div>
)
}