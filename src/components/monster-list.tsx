import React from "react";

import { type Monster } from "../types/bestiary.ts";
import { useGetBestiary } from "../queries/use-get-bestiary.ts";

const BestiaryItem: React.FC<{ monster: Monster }> = ({ monster }) => {
  return (
    <div>
      <p>Имя: {monster.name}</p>
      <p> ХП: {monster.hp}</p>
      <p>Броня: {monster.ac}</p>
      <p>Инициатива: {monster.initiative}</p>
    </div>
  );
};

export const MonsterList: React.FC = () => {
  const bestiaryQuery = useGetBestiary();

  if (bestiaryQuery.isLoading) {
    return "Loading...";
  }

  if (!bestiaryQuery.data) {
    return "no data";
  }
  return (
    <div>
      {bestiaryQuery.data.map((item) => (
        <BestiaryItem key={item.id} monster={item} />
      ))}
    </div>
  );
};
