import React, { useCallback, type ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useToggle } from "@reactuses/core";

import { type BattleMonster, type Monster } from "../types/bestiary.ts";
import { NumberModal } from "./number-modal.tsx";

export const MonsterPanel: React.FC<{
  monster: Monster;
  actions?: React.ReactNode;
}> = ({ monster, actions }) => {
  return (
    <div>
      <Box sx={{ width: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography sx={{ color: "text.secondary" }}>
              ID: {monster.id}
            </Typography>
            <Typography variant="h5" component="div">
              {monster.name}
            </Typography>
            <Typography sx={{ color: "text.primary", mb: 1.5 }}>
              ХП: {monster.hp}
            </Typography>
            <Typography sx={{ color: "text.primary", mb: 1.5 }}>
              Броня: {monster.ac}
            </Typography>
            <Typography sx={{ color: "text.primary" }}>
              Бонус инициативы: {monster.initiative || 0}
            </Typography>
          </CardContent>
          <CardActions>{actions}</CardActions>
        </Card>
      </Box>
    </div>
  );
};

export const MonsterBattlePanel: React.FC<{
  monster: BattleMonster;
  actions?: React.ReactNode;
}> = ({ monster, actions }) => {
  const [initiative, setInitiative] = useState(monster.initiativeRoll);
  const [hp, setHp] = useState(monster.hp);
  const [isHealOpen, toggleHealOpen] = useToggle(false);
  const [isDamageOpen, toggleDamageOpen] = useToggle(false);

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
      console.log("onChange", newValue);
    },
    [],
  );

  const damage = useCallback(
    (value?: number) => {
      if (!value) return;
      setHp((prev) => {
        const current = prev || 0;
        console.log("prev", prev);
        console.log("current", current);
        console.log("value", value);
        const newHp = current - value;
        console.log("newHp", newHp);
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
      const newHp = +current + +value;
      monster.hp = newHp;
      return newHp;
    });
  }, []);
  return (
    <>
      <div>
        <Box sx={{ width: 500 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div">
                {monster.nameStr}
              </Typography>
              <div className="flex mt-2 space-x-2">
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
              </div>
              <div className="flex space-x-2 mt-2">
                <IconButton
                  onClick={toggleDamageOpen}
                  color="error"
                  aria-label="damage"
                  size="small"
                >
                  <HeartBrokenIcon fontSize="large" />
                </IconButton>
                <IconButton
                  onClick={toggleHealOpen}
                  color="success"
                  aria-label="heal"
                  size="small"
                >
                  <FavoriteIcon fontSize="large" />
                </IconButton>
              </div>
              <div>
                <NumberModal
                  buttonText="Нанасети урон"
                  onSubmit={damage}
                  onClose={toggleDamageOpen}
                  isOpen={isDamageOpen}
                />
                <NumberModal
                  buttonText="Полечить"
                  onSubmit={heal}
                  onClose={toggleHealOpen}
                  isOpen={isHealOpen}
                />
              </div>
              <div className="flex space-x-2 mt-2">
                <div>
                  <Typography sx={{ color: "text.primary", mb: 1.5 }}>
                    Броня: {monster.ac || 0}
                  </Typography>
                </div>
                <div>
                  <Typography sx={{ color: "text.primary" }}>
                    Бонус инициативы: {monster.initiative || 0}
                  </Typography>
                </div>
              </div>
            </CardContent>
            <CardActions>{actions}</CardActions>
          </Card>
        </Box>
      </div>
    </>
  );
};
