import React from "react";
import { NavLink } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";

import { useAppContext } from "../context.ts";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "block w-full rounded px-2 py-1.5 text-sm font-medium no-underline transition-colors",
    isActive
      ? "bg-[#3b3534]/15 text-[#3b3534]"
      : "text-[#3b3534]/80 hover:bg-[#3b3534]/10",
  ].join(" ");

export const Sidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { showHidden, setShowHidden } = useAppContext();

  return (
    <div className="sticky top-0 box-border flex h-[100vh] w-75 flex-col justify-between space-y-2 overflow-auto p-2">
      <div className="space-y-2">
        <FormControlLabel
          control={
            <Checkbox
              id="show-n-checkbox"
              checked={showHidden}
              onChange={(e) => setShowHidden(e.target.checked)}
            />
          }
          label="Секретные монстры"
        />
        <nav className="flex flex-col gap-1 border-t border-[#3b3534]/15 pt-2">
          <NavLink to="/" end className={navLinkClass}>
            Бой
          </NavLink>
          <NavLink to="/bestiary" className={navLinkClass}>
            Бестриарий
          </NavLink>
        </nav>
      </div>
      {children}
    </div>
  );
};
