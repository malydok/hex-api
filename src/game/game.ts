import { Game, Board, SelectFieldArgs } from './game.types';

const SIZE = 11;

export const createGame = (): Game => ({
  board: Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => undefined),
  ),
  turn: 'player1',
});

const checkPlayer1 = (board: Board) => {
  const startRow = board[0];
  if (!startRow.includes('player1')) {
    return false;
  }

  return false;
};

const checkWinConditions = (game: Game) => {
  checkPlayer1(game.board);
};

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
  return game;
};
