import React from "react";

import { MonsterList } from "../components/monster-list.tsx";
import { AddMonsterForm } from "../components/add-monster-form.tsx";
import { useGetBestiary } from "../queries/bestiary.ts";

export const BestiaryPage: React.FC = () => {
  const bestiaryQuery = useGetBestiary();

  return (
    <div className="mt-2 p-5 space-y-4">
      <AddMonsterForm currentMonsters={bestiaryQuery.data || []} />
      <MonsterList
        monsters={bestiaryQuery.data || []}
        isLoading={bestiaryQuery.isLoading}
      />
    </div>
  );
};
