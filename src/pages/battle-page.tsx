import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";

import { useGetBestiary } from "../queries/bestiary.ts";
import { MonstersSearch } from "../components/monsters-search.tsx";
import { type BattleMonster, type Monster } from "../types/bestiary.ts";
import { MonsterBattlePanel } from "../components/monster-battle-panel.tsx";
import { DiceRollerForm } from "../components/dice-roller-form.tsx";
import { rollDice } from "../utils/dice.ts";
import { SidebarLayout } from "../components/sidebar-layout.tsx";

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

  const clearMonsters = useCallback(() => {
    setPickedMonsters([]);
  }, []);

  return (
    <SidebarLayout
      bottomSlot={
        <div className="w-full">
          <Button
            fullWidth
            onClick={clearMonsters}
            variant="contained"
            size="medium"
            color="error"
          >
            Очистить
          </Button>
        </div>
      }
      searchSlot={
        <div className="space-y-2">
          <MonstersSearch
            onPickMonster={handlePickMonster}
            allMonsters={monstersQuery.data || []}
          />
          <div className="w-full">
            <Button
              fullWidth
              onClick={sortMonsters}
              variant="contained"
              size="medium"
            >
              Отсортировать
            </Button>
          </div>
          <div className="mt-3">
            <DiceRollerForm />
          </div>
        </div>
      }
    >
      <div className="flex flex-col space-y-4">
        {pickedMonsters.map((monster) => (
          <MonsterBattlePanel
            key={monster.id}
            monster={monster}
            removeMonster={removeMonster}
          />
        ))}
      </div>
    </SidebarLayout>
  );
};
