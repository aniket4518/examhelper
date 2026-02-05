"use client";

import React from "react";
import { useCollapseStore } from "../../hooks/zustand/CheckCollapsestate";

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

export default function Tools() {
  const { collapseStudio } = useCollapseStore();

  return (
    <div className={collapseStudio ? "flex flex-col gap-2 items-center p-2 pt-16 w-full" : "p-4 pt-16"}>
      {/* Header */}
      {!collapseStudio && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-neutral-200 mb-1">Create</h3>
          <p className="text-xs text-neutral-500">
            Audio Overview in: <span className="text-neutral-400">हिन्दी, english</span>
          </p>
        </div>
      )}

      {/* Tools grid */}
      <div className={collapseStudio ? "flex flex-col gap-2 items-center w-full" : "grid grid-cols-2 gap-2"}>
        {tools.map((tool, idx) => (
          <button
            key={idx}
            className={`tool-card group ${collapseStudio
              ? "w-10 h-10 flex items-center justify-center"
              : "flex items-center gap-3 p-3 text-left w-full"
              }`}
          >
            {tool.icon === "BETA" ? (
              <span className="badge-beta">BETA</span>
            ) : (
              <span className={`material-symbols-outlined text-neutral-400 transition-all duration-200 group-hover:text-neutral-200 ${collapseStudio ? "text-lg" : "text-xl"
                }`}>
                {tool.icon}
              </span>
            )}
            {!collapseStudio && tool.icon !== "BETA" && (
              <span className="text-sm text-neutral-300 group-hover:text-neutral-100 transition-colors">
                {tool.label}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
