import React from "react";

import { Sidebar } from "./sidebar";

export const SidebarLayout: React.FC<{
  children: React.ReactNode;
  sidebarSlot: React.ReactNode;
}> = ({ children, sidebarSlot }) => {
  return (
    <div className="flex w-full">
      <Sidebar>{sidebarSlot}</Sidebar>
      <div className="h-full w-full border-l px-2">{children}</div>
    </div>
  );
};
