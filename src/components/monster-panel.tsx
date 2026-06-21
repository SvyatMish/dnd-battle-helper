import React, { useCallback, type ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

import { type BattleMonster, type Monster } from "../types/bestiary.ts";

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
  return (
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
  );
};
