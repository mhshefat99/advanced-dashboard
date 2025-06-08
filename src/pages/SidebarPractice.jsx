import { useState } from "react";
import { Sun } from "lucide-react";

function SidebarPractice() {
  const [isOpen, setOpen] = useState(false);
  //   const iconWidth = 8*4=32;
  const collapsedSidebarWidth = 64;
  return (
    <div className="flex h-screen w-full justify-between">
      <div
        className={`h-full bg-amber-200 px-2 transition-all duration-300 ${isOpen ? "w-[256px]" : `w-[${collapsedSidebarWidth}px]`}`}
      >
        <button className="flex items-center gap-2 border px-2">
          <Sun className="size-8 flex-shrink-0 object-cover" />
          <span
            className={`flex-shrink-0 transition-all duration-300 ${isOpen ? "block opacity-100" : "hidden opacity-0"}`}
          >
            click me
          </span>
        </button>
      </div>
      <div className="flex-1 border">
        <button className="border p-2" onClick={() => setOpen(!isOpen)}>
          Toggle
        </button>
      </div>
    </div>
  );
}

export default SidebarPractice;

//64px
