const SIZE = 11;

type Field = undefined | string;
export type Game = Field[][];
type SelectFieldArgs = {
  game: Game;
  rowIndex: number;
  fieldIndex: number;
  player: string;
};

export const createGame = (): Game =>
  Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => undefined),
  );

export const selectField = ({
  game,
  rowIndex,
  fieldIndex,
  player,
}: SelectFieldArgs) => {
  game[rowIndex][fieldIndex] = player;
  return game;
};
