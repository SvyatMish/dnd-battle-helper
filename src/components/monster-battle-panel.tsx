import React, { useCallback, type ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShieldIcon from "@mui/icons-material/Shield";
import Button from "@mui/material/Button";

import { type BattleMonster, type Monster } from "../types/bestiary.ts";
import { NumberForm } from "./number-form.tsx";

export const MonsterBattlePanel: React.FC<{
  monster: BattleMonster;
  removeMonster: (monster: Monster) => void;
}> = ({ monster, removeMonster }) => {
  const [initiative, setInitiative] = useState(monster.initiativeRoll);
  const [hp, setHp] = useState(monster.hp);

  const onInitiativeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value
        ? Number(event.target.value)
        : undefined;
      setInitiative(newValue);
      monster.initiativeRoll = newValue;
    },
    [],
  );

  const onHpChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value
        ? Number(event.target.value)
        : undefined;
      setHp(newValue);
      monster.hp = newValue;
    },
    [],
  );

  const damage = useCallback(
    (value?: number) => {
      if (!value) return;
      setHp((prev) => {
        const current = prev || 0;
        const newHp = current - value;
        monster.hp = newHp;
        return newHp;
      });
    },
    [hp],
  );

  const heal = useCallback((value?: number) => {
    if (!value) return;
    setHp((prev) => {
      const current = prev || 0;
      const newHp = +current + value;
      monster.hp = newHp;
      return newHp;
    });
  }, []);
  const handleRemove = useCallback(() => {
    removeMonster(monster);
  }, [monster, removeMonster]);
  return (
    <>
      <div>
        <Box className="w-full">
          <Card variant="outlined">
            <CardContent>
              <div className="flex space-x-2 items-center">
                <div className="relative h-6 w-6 items-center justify-center flex">
                  <ShieldIcon fontSize="medium" />
                  <div className="absolute items-center justify-center flex top-0 left-0 h-6 w-6 text-white text-[12px] font-extrabold">
                    {monster.ac || 0}
                  </div>
                </div>
                <Typography variant="h5" component="div">
                  {monster.nameStr}
                </Typography>
                {monster.initiative && (
                  <div className="ml-2">
                    <Typography className="text-gray-500" variant="caption">
                      Бонус инициативы: {monster.initiative}
                    </Typography>
                  </div>
                )}
              </div>
              <div className="flex mt-2 space-x-2 items-center">
                <div>
                  <TextField
                    onChange={onHpChange}
                    value={hp}
                    type="number"
                    id={`hp-${monster.id}`}
                    label="Здоровье"
                    size="small"
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    onChange={onInitiativeChange}
                    value={initiative}
                    type="number"
                    id={`initiative-${monster.id}`}
                    label="Ролл инициативы"
                    size="small"
                    variant="outlined"
                  />
                </div>
                <div className="flex w-full justify-between items-center">
                  <div className="flex space-x-2 items-center">
                    <NumberForm
                      icon={<HeartBrokenIcon fontSize="large" />}
                      color="error"
                      onSubmit={damage}
                      label="Урон"
                    />
                    <NumberForm
                      onSubmit={heal}
                      color="success"
                      label="Лечить"
                      icon={<FavoriteIcon fontSize="large" />}
                    />
                  </div>
                  <div>
                    <Button
                      onClick={handleRemove}
                      variant="contained"
                      size="small"
                    >
                      Убрать
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
};
