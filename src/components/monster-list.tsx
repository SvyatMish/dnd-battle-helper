import React from "react";

import { type Monster } from "../types/bestiary.ts";
import { MonsterPanel } from "./monster-panel.tsx";

export const MonsterList: React.FC<{
  monsters: Monster[];
  isLoading: boolean;
}> = ({ monsters, isLoading }) => {
  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="flex space-y-2 space-x-2 flex-wrap">
      {monsters.map((item) => (
        <MonsterPanel key={item.id} monster={item} currentMonsters={monsters} />
      ))}
    </div>
  );
};
