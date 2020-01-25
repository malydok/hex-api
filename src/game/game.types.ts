type Player = 'player1' | 'player2';
type Field = undefined | string;

export type Board = Field[][];

export type Game = {
  board: Board;
  turn: Player;
};
export type SelectFieldArgs = {
  game: Game;
  rowIndex: number;
  fieldIndex: number;
  player: Player;
};
