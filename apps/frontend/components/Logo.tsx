import Image from "next/image";
import { Button } from "../../../packages/ui/src/button";
import { useCollapseStore } from "../hooks/zustand/CheckCollapsestate";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import logo from "../public/logo.png";

export default function Logo() {
  const { collapseNavbar, toggleCollapseNavbar } = useCollapseStore();
  return (
    <div className="flex items-center justify-between w-full p-4 border-b border-neutral-800">
      {/* Logo with name */}
      <div className="flex items-center gap-3">
        <Image
          src={logo}
          alt="logo"
          className={`${collapseNavbar ? "w-10 h-10" : "w-12 h-12"} rounded-lg transition-all duration-300`}
          width={48}
          height={48}
        />
        {!collapseNavbar && (
          <span className="text-lg font-semibold text-neutral-100">
            camp spot
          </span>
        )}
      </div>

      {/* Toggle button */}
      <Button
        className="p-2 w-8 h-8 flex items-center justify-center rounded-lg btn-ghost transition-all duration-200"
        handelonclick={toggleCollapseNavbar}
      >
        {collapseNavbar ? (
          <FaChevronRight className="text-sm text-neutral-400" />
        ) : (
          <FaChevronLeft className="text-sm text-neutral-400" />
        )}
      </Button>
    </div>
  );
}