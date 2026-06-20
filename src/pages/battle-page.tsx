import React from "react";

import { BestiarySearch } from "../components/bestiary-search.tsx";

export const BattlePage: React.FC = () => {
  return (
    <div>
      <h1>Бой</h1>
      <BestiarySearch />
    </div>
  );
};
