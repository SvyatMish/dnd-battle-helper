export type Monster = {
  id: string;
  name: string;
  hp?: number;
  ac?: number;
  initiative?: number;
  isSecret?: boolean;
};

export type BattleMonster = Monster & {
  initiativeRoll?: number;
  nameStr: string;
};
