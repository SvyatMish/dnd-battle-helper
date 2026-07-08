import React, { useCallback, useState } from "react";
import { TextField } from "@mui/material";

import { MonsterList } from "../components/monster-list.tsx";
import { AddMonsterForm } from "../components/add-monster-form.tsx";
import { SidebarLayout } from "../components/sidebar-layout.tsx";
import { useGetBestiary } from "../queries/bestiary.ts";

export const BestiaryPage: React.FC = () => {
  const bestiaryQuery = useGetBestiary();
  const [search, setSearch] = useState("");

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  return (
    <SidebarLayout
      searchSlot={
        <div>
          <TextField
            id="search"
            label="Поиск"
            fullWidth
            variant="outlined"
            size="medium"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </div>
      }
    >
      <div className="mt-2 space-y-4 p-5">
        <AddMonsterForm currentMonsters={bestiaryQuery.data || []} />
        <MonsterList
          search={search}
          monsters={bestiaryQuery.data || []}
          isLoading={bestiaryQuery.isLoading}
        />
      </div>
    </SidebarLayout>
  );
};
