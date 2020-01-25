import { Board } from './game.types';

export const flipBoard = (board: Board) => {
  const flipped: Board = [];
  board.forEach((row, rowIndex) => {
    row.forEach((field, fieldIndex) => {
      if (!flipped[fieldIndex]) {
        flipped[fieldIndex] = [];
      }
      flipped[fieldIndex][rowIndex] = field;
    });
  });
  return flipped;
};
