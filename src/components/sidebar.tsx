import React from "react";

export const Sidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="sticky top-20.5 box-border flex h-[calc(100vh-200px)] w-75 flex-col justify-between space-y-2 overflow-auto p-2">
      {children}
    </div>
  );
};
