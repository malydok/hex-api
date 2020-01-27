import { Game, SelectFieldArgs, Board } from './game.types';
import { checkWinner } from './checkWinner';

const SIZE = 11;

export const createBoard = (): Board =>
  Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => undefined),
  );

export const createGame = (): Game => ({
  board: createBoard(),
  turn: 'player1',
});

export const selectField = ({
  game,
  rowIndex,
  fieldIndex,
  player,
}: SelectFieldArgs) => {
  if (game.board[rowIndex][fieldIndex]) {
    throw Error('Field already selected!');
  }
  game.board[rowIndex][fieldIndex] = player;
  game.turn = player === 'player1' ? 'player2' : 'player1';
  if (checkWinner(game.board, player)) {
    game.winner = player;
  }
  return game;
};
