import { Switch } from "@headlessui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useTheme } from "next-themes";
import React from "react";
import { useState } from "react";

function ToggleBtn() {
  const [enabled, setEnabled] = useState(true);
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    setEnabled((prev) => !prev);
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className={`${enabled ? "bg-zinc-800" : "bg-zinc-200"}
relative inline-flex justify-start items-center flex-shrink-0 z-[100] h-[34px] w-[70px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span
        className={`${
          enabled ? "translate-x-1" : "translate-x-9"
        } absolute z-[999] pointer-events-none inline-block h-[28px] w-[28px] 
      rounded-fullshadow-lg transform ring-0 transition ease-in-out duration-200
      text-zinc-200 dark:text-zinc-800`}
      >
        {enabled ? <SunIcon /> : <MoonIcon />}
      </span>

      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-9" : "translate-x-[2px]"}
pointer-events-none inline-block h-[28px] w-[28px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  );
}

export default ToggleBtn;
