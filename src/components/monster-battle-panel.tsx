import React, { useCallback, type ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton, TextField } from "@mui/material";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShieldIcon from "@mui/icons-material/Shield";
import CloseIcon from "@mui/icons-material/Close";

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
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative flex h-6 w-6 items-center justify-center">
                    <ShieldIcon fontSize="medium" />
                    <div className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center text-[12px] font-extrabold text-white">
                      {monster.ac || 0}
                    </div>
                  </div>
                  <Typography variant="h5" component="div">
                    {monster.nameStr}
                  </Typography>

                  <div className="ml-2">
                    <Typography className="text-gray-500" variant="caption">
                      Бонус инициативы: {monster.initiative || 0}
                    </Typography>
                  </div>
                </div>
                <IconButton onClick={handleRemove} size="small" color="error">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <div className="mr-10 flex items-center space-x-2">
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
                </div>
                <div className="flex items-center space-x-2">
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
              </div>
              {monster.actions && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs text-gray-500 select-none">
                    Действия
                  </summary>
                  <Typography
                    variant="body2"
                    className="mt-1 whitespace-pre-wrap text-gray-700"
                  >
                    {monster.actions}
                  </Typography>
                </details>
              )}
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
};
