import React from "react";

import { MonsterList } from "../components/monster-list.tsx";
import { AddMonsterForm } from "../components/add-monster-form.tsx";

export const BestiaryPage: React.FC = () => {
  return (
    <div className="mt-2 p-5">
      <AddMonsterForm />
      <MonsterList />
    </div>
  );
};
