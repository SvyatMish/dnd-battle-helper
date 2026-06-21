import React from "react";

import { BestiarySearch } from "../components/bestiary-search.tsx";
import { useGetBestiary } from "../queries/bestiary.ts";
import { MonstersSearch } from "../components/monsters-search.tsx";

export const BattlePage: React.FC = () => {
  const monstersQuery = useGetBestiary();
  return (
    <div>
      <h1>Бой</h1>
      <MonstersSearch allMonsters={monstersQuery.data || []} />
      <BestiarySearch />
    </div>
  );
};
