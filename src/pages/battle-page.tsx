import React, { useCallback, useState } from "react";
import Button from "@mui/material/Button";

import { useGetBestiary } from "../queries/bestiary.ts";
import { MonstersSearch } from "../components/monsters-search.tsx";
import { type BattleMonster, type Monster } from "../types/bestiary.ts";
import { MonsterBattlePanel } from "../components/monster-panel.tsx";
import { rollDice } from "../utils/dice.ts";

export const BattlePage: React.FC = () => {
  const monstersQuery = useGetBestiary();
  const [pickedMonsters, setPickedMonsters] = useState<BattleMonster[]>([]);

  const handlePickMonster = useCallback((monster: Monster) => {
    console.log("Pick monster", monster);
    setPickedMonsters((current) => {
      const newMonster: BattleMonster = {
        ...monster,
        id: Date.now().toString(),
        initiativeRoll: rollDice({ modifier: Number(monster.initiative || 0) }),
      };
      return [newMonster, ...current];
    });
  }, []);

  const removeMonster = useCallback((monster: Monster) => {
    setPickedMonsters((current) => {
      return current.filter((item) => item.id !== monster.id);
    });
  }, []);

  const sortMonsters = useCallback(() => {
    setPickedMonsters((current) => {
      const sorted = current.sort((a, b) => {
        return b.initiativeRoll - a.initiativeRoll;
      });
      return [...sorted];
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
        <Button onClick={sortMonsters} variant="contained" size="medium">
          Отсортировать
        </Button>
        {pickedMonsters.map((monster) => (
          <MonsterBattlePanel
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
