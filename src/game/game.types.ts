export type Player = 'player1' | 'player2';

export type Field = undefined | Player;

export type Board = Field[][];

export type BoardPosition = [number, number];

export type Game = {
  board: Board;
  turn: Player;
  winner?: Player;
};
export type SelectFieldArgs = {
  game: Game;
  rowIndex: number;
  fieldIndex: number;
  player: Player;
};
