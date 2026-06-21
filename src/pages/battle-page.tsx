import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";

import { useGetBestiary } from "../queries/bestiary.ts";
import { MonstersSearch } from "../components/monsters-search.tsx";
import { type BattleMonster, type Monster } from "../types/bestiary.ts";
import { MonsterBattlePanel } from "../components/monster-panel.tsx";
import { rollDice } from "../utils/dice.ts";

const monstersLsKey = "currentMonsterFight";

const setMonstersLs = (monsters: BattleMonster[]) => {
  localStorage.setItem(monstersLsKey, JSON.stringify(monsters));
};

const getMonstersLs = (): BattleMonster[] => {
  const monsters = localStorage.getItem(monstersLsKey);
  if (!monsters) return [];
  return JSON.parse(monsters);
};

export const BattlePage: React.FC = () => {
  const monstersQuery = useGetBestiary();
  const [pickedMonsters, setPickedMonsters] =
    useState<BattleMonster[]>(getMonstersLs());

  const handlePickMonster = useCallback((monster: Monster) => {
    console.log("Pick monster", monster);
    setPickedMonsters((current) => {
      const similarMonsters = current.filter(
        (item) => item.name === monster.name,
      );
      const newMonster: BattleMonster = {
        ...monster,
        id: Date.now().toString(),
        initiativeRoll: rollDice({ modifier: Number(monster.initiative || 0) }),
        nameStr: similarMonsters.length
          ? `${monster.name} (${similarMonsters.length + 1}) `
          : monster.name,
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
        return (b.initiativeRoll || 0) - (a.initiativeRoll || 0);
      });
      return [...sorted];
    });
  }, []);

  useEffect(() => {
    setPickedMonsters((current) => {
      setMonstersLs(current);
      return current;
    });
    return () => {
      setPickedMonsters((current) => {
        setMonstersLs(current);
        return current;
      });
    };
  }, [pickedMonsters]);

  return (
    <div className="p-4 grid grid-cols-[300px_1fr_200px] box-border">
      <div className="flex flex-col border-r min-h-[calc(100vh-120px)] px-2 space-y-2 box-border">
        <MonstersSearch
          onPickMonster={handlePickMonster}
          allMonsters={monstersQuery.data || []}
        />
        <Button onClick={sortMonsters} variant="contained" size="medium">
          Отсортировать
        </Button>
      </div>
      <div className="px-2 flex flex-col space-y-4">
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
      <div>
        <Button
          onClick={() => {
            setPickedMonsters([]);
          }}
          variant="contained"
          size="medium"
        >
          Очистить
        </Button>
      </div>
    </div>
  );
};
