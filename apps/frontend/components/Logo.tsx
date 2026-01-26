import Image from "next/image";
import { Button } from "../../../packages/ui/src/button";
import { useCollapseStore } from "../hooks/zustand/CheckCollapsestate";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import logo from "../public/logo.png";

export default function Logo() {
    const { collapseNavbar,  toggleCollapseNavbar } = useCollapseStore();
  return (
    <div className="grid grid-cols-3 gap-1 w-full h-1/10 justify-items-center">
      {/* Show logo with name and id below here */}
      <div className="col-span-2 justify-items-center text-black flex display-inline font-bold items-center">
        <Image
          src={logo}
          alt="logo.img"
          className={`${collapseNavbar? "w-full h-full" : "w-1/2 h-full"} align-self-top`}
          width={100}
          height={100}
        />
        {!collapseNavbar &&<span className="justify-items-center h-1/2">camp spot</span> }
      </div>
      {/* show toggle nav button here */}
      <div className="col-span-1">
        <Button
          className={`mt-2 mb-4 p-1 border h-7 w-7 flex items-center justify-center bg-slate-100 rounded-md  transition-all duration-300 absolute right-2 top-3 `}
          handelonclick={toggleCollapseNavbar}
        >
          {collapseNavbar ? <FaChevronRight /> : <FaChevronLeft />}
        </Button>
      </div>
    </div>
  );
}