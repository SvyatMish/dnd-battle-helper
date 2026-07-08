import React from "react";

import { Sidebar } from "./sidebar";

export const SidebarLayout: React.FC<{
  children: React.ReactNode;
  searchSlot: React.ReactNode;
  bottomSlot?: React.ReactNode;
}> = ({ children, searchSlot, bottomSlot }) => {
  return (
    <div className="flex w-full">
      <Sidebar searchSlot={searchSlot} bottomSlot={bottomSlot} />
      <div className="h-full w-full border-l px-2 py-4">{children}</div>
    </div>
  );
};
