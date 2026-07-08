import React, { useMemo } from "react";

import { type Monster } from "../types/bestiary.ts";
import { MonsterPanel } from "./monster-panel.tsx";

export const MonsterList: React.FC<{
  monsters: Monster[];
  isLoading: boolean;
  search?: string;
}> = ({ monsters, isLoading, search }) => {
  const filtered = useMemo(() => {
    if (!search) {
      return monsters;
    }
    return monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="flex flex-wrap space-y-2 space-x-2">
      {filtered.map((item) => (
        <MonsterPanel key={item.id} monster={item} currentMonsters={monsters} />
      ))}
    </div>
  );
};
