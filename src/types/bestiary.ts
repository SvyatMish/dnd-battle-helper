export type Monster = {
  id: string;
  name: string;
  hp?: number;
  ac?: number;
  initiative?: number;
};

export type BattleMonster = Monster & {
  initiativeRoll: number;
};
