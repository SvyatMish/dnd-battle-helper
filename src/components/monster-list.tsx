import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { type Monster } from "../types/bestiary.ts";
import { useGetBestiary } from "../queries/use-get-bestiary.ts";

const BestiaryItem: React.FC<{ monster: Monster }> = ({ monster }) => {
  return (
    <div>
      <Box sx={{ width: 275 }}>
        <Card variant="outlined">
          <CardContent>
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
            <Button variant="contained" size="small">
              Удалить
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export const MonsterList: React.FC = () => {
  const bestiaryQuery = useGetBestiary();

  if (bestiaryQuery.isLoading) {
    return "Loading...";
  }

  if (!bestiaryQuery.data) {
    return "no data";
  }
  return (
    <div className="flex space-y-2 space-x-2 flex-wrap">
      {bestiaryQuery.data.map((item) => (
        <BestiaryItem key={item.id} monster={item} />
      ))}
    </div>
  );
};
