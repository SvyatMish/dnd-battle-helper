import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

import { type Monster } from "../types/bestiary.ts";

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
              Бонус инициативы: {monster.initiative}
            </Typography>
          </CardContent>
          <CardActions>{actions}</CardActions>
        </Card>
      </Box>
    </div>
  );
};

export const MonsterBattlePanel: React.FC<{
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
            <TextField type="number" id={monster.id} label="Ролл инициативы" />
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
              Бонус инициативы: {monster.initiative}
            </Typography>
          </CardContent>
          <CardActions>{actions}</CardActions>
        </Card>
      </Box>
    </div>
  );
};
