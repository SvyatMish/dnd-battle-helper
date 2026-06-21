import React, { useCallback, useState } from "react";
import Button from "@mui/material/Button";

import { useGetBestiary } from "../queries/bestiary.ts";
import { MonstersSearch } from "../components/monsters-search.tsx";
import { type Monster } from "../types/bestiary.ts";
import { MonsterPanel } from "../components/monster-panel.tsx";

export const BattlePage: React.FC = () => {
  const monstersQuery = useGetBestiary();
  const [pickedMonsters, setPickedMonsters] = useState<Monster[]>([]);

  const handlePickMonster = useCallback((monster: Monster) => {
    console.log("Pick monster", monster);
    setPickedMonsters((current) => {
      return [{ ...monster, id: Date.now().toString() }, ...current];
    });
  }, []);

  const removeMonster = useCallback((monster: Monster) => {
    setPickedMonsters((current) => {
      return current.filter((item) => item.id !== monster.id);
    });
  }, []);

  return (
    <div className="p-4 grid grid-cols-[310px_1fr] box-border">
      <div className="flex border-r min-h-[calc(100vh-120px)]">
        <MonstersSearch
          onPickMonster={handlePickMonster}
          allMonsters={monstersQuery.data || []}
        />
      </div>
      <div className="p-4 flex flex-col space-y-4">
        {pickedMonsters.map((monster: Monster) => (
          <MonsterPanel
            key={monster.id}
            monster={monster}
            actions={
              <>
                <Button
                  onClick={() => {
                    removeMonster(monster);
                  }}
                  variant="contained"
                  size="small"
                >
                  Убрать
                </Button>
              </>
            }
          />
        ))}
      </div>
    </div>
  );
};
