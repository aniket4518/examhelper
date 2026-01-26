import React from "react";
import  { useCollapseStore} from "../../hooks/zustand/CheckCollapsestate"
 
const tools = [
  { label: "Audio Overview", icon: "audio_file" },
  { label: "Video Overview", icon: "movie" },
  { label: "Mind Map", icon: "account_tree" },
  { label: "Reports", icon: "description" },
  { label: "Flashcards", icon: "style" },
  { label: "Quiz", icon: "quiz" },
  { label: "Infographic", icon: "BETA" }, 
  { label: "Data Table", icon: "table_chart" },
];

// const badgeStyle =
//   "ml-2 px-2 py-0.5 text-xs font-semibold rounded bg-yellow-200 text-yellow-800";

export default function Tools() {
  const { collapseStudio } = useCollapseStore();
  return (
    <div className={collapseStudio ? "flex flex-col gap-3 justify-center items-center p-2 mt-20 justify-contents-center w-full" : "p-4 mt-30"}>
      {!collapseStudio && (
        <div className="mb-2 text-sm text-gray-700">
          Create an Audio Overview in: <span className="text-blue-700">हिन्दी, english</span>
        </div>
      )}
      <div className={collapseStudio ? "flex flex-col gap-3 items-center w-full" : "grid grid-cols-2 gap-4"}>
        {tools.map((tool, idx) => (
          <button
            key={idx}
            className={
              (collapseStudio
                ? "flex items-center justify-center self-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-teal-100 hover:to-lime-200 transition relative shadow-md border border-teal-200 text-gray-700 text-xl w-12 h-12 transition-all duration-200"
                : "flex items-center p-4 rounded-lg bg-gray-100 hover:bg-gradient-to-r hover:from-teal-100 hover:to-lime-200 transition relative"
              ) + " group"
            }
          >
            {tool.icon === "BETA" ? (
              <span className="px-2 py-0.5 text-xs font-semibold rounded bg-yellow-200 text-yellow-800">BETA</span>
            ) : (
              <span className={(collapseStudio ? "flex items-center justify-center" : "mr-2 ") + " material-symbols-outlined transition-transform duration-200 group-hover:scale-125 group-hover:-rotate-6"}>
                  {tool.icon}
              </span>
            )}
            {!collapseStudio && tool.icon !== "BETA" && tool.label}
          </button>
        ))}
      </div>
    </div>
  );
}
