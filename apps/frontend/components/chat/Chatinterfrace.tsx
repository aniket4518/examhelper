import { useCollapseStore } from "../../hooks/zustand/CheckCollapsestate";
export default function ChatInterface(){
     const { collapse, toggleCollapse } = useCollapseStore();
return(
    <div  className={`bg-red-50/20 p-4  justify content-cneter justify   ${
        collapse ? " col-span-8" : "col-span-7"
      }`}>
        <div className="text-black ">
            this is the chat interface
        </div>
    </div>
)
}