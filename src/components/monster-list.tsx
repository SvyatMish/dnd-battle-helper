import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { type Monster } from "../types/bestiary.ts";
import { useDeleteMonster } from "../queries/bestiary.ts";

const BestiaryItem: React.FC<{ monster: Monster }> = ({ monster }) => {
  const deleteMutation = useDeleteMonster();
  const handleDelete = useCallback(async () => {
    await deleteMutation.mutateAsync(monster.id);
  }, [monster.id]);
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
              Инициатива: {monster.initiative}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              loading={deleteMutation.isPending}
              onClick={handleDelete}
              variant="contained"
              size="small"
            >
              Удалить
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export const MonsterList: React.FC<{
  monsters: Monster[];
  isLoading: boolean;
}> = ({ monsters, isLoading }) => {
  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="flex space-y-2 space-x-2 flex-wrap">
      {monsters.map((item) => (
        <BestiaryItem key={item.id} monster={item} />
      ))}
    </div>
  );
};
