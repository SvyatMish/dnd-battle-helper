import React from "react";

import { MonsterList } from "../components/monster-list.tsx";
import { AddMonsterForm } from "../components/add-monster-form.tsx";
import { SidebarLayout } from "../components/sidebar-layout.tsx";
import { useGetBestiary } from "../queries/bestiary.ts";

export const BestiaryPage: React.FC = () => {
  const bestiaryQuery = useGetBestiary();

  return (
    <SidebarLayout sidebarSlot={null}>
      <div className="mt-2 space-y-4 p-5">
        <AddMonsterForm currentMonsters={bestiaryQuery.data || []} />
        <MonsterList
          monsters={bestiaryQuery.data || []}
          isLoading={bestiaryQuery.isLoading}
        />
      </div>
    </SidebarLayout>
  );
};
