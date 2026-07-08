import React from "react";
import { NavLink } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";

import { useAppContext } from "../context.ts";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "text-2xl font-bold no-underline transition-colors",
    isActive ? "text-[#1976d2]" : "text-[#757575]",
  ].join(" ");

export const Sidebar: React.FC<{
  searchSlot: React.ReactNode;
  bottomSlot?: React.ReactNode;
}> = ({ searchSlot, bottomSlot }) => {
  const { showHidden, setShowHidden } = useAppContext();

  return (
    <div className="sticky top-0 box-border flex h-screen w-75 flex-col justify-between space-y-2 overflow-auto px-2 py-4">
      <div className="space-y-4">
        <nav className="flex justify-between">
          <NavLink to="/" end className={navLinkClass}>
            Бой
          </NavLink>
          <NavLink to="/bestiary" className={navLinkClass}>
            Бестриарий
          </NavLink>
        </nav>
        {searchSlot}
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
      </div>
      {bottomSlot}
    </div>
  );
};
