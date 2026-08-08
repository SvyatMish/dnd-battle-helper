import React, { useCallback, useState } from "react";
import { Button, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { rollDice } from "../utils/dice.ts";

const dice = [4, 6, 8, 10, 12, 20] as const;

export const DiceRollerForm: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);

  const handleRoll = useCallback((sides: (typeof dice)[number]) => {
    const result = rollDice({ sides });
    setResults((current) => [`d${sides} - ${result}`, ...current]);
    setTotal((current) => current + result);
  }, []);

  const handleClear = useCallback(() => {
    setResults([]);
    setTotal(0);
  }, []);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-6 gap-2">
        {dice.map((sides) => (
          <Button
            key={sides}
            type="button"
            size="small"
            variant="outlined"
            aria-label={`Бросить d${sides}`}
            onClick={() => handleRoll(sides)}
            sx={{ minWidth: 0, height: 40 }}
          >
            d{sides}
          </Button>
        ))}
      </div>
      {results.length > 0 && (
        <div className="max-h-24 overflow-y-auto rounded border border-gray-300 px-2 py-1 text-sm">
          {results.map((result, index) => (
            <div key={`${result}-${index}`}>{result}</div>
          ))}
        </div>
      )}
      {Boolean(total) && results.length > 1 && (
        <div className="flex justify-between">
          <div>
            <span className="text-sm">
              Сумма ({results.length}): {total}
            </span>
          </div>
          <div>
            <IconButton
              aria-label="Очистить поиск"
              edge="end"
              size="small"
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleClear}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};
