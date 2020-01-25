import { Game, Board, Player } from './game.types';
import { SIZE } from './game';
import { flipBoard } from './flipBoard';

const checkPlayersBoard = (board: Board, player: Player) => {
  const startRow = board[0];
  const endRow = board[SIZE - 1];
  if (!startRow.includes(player) || !endRow.includes(player)) {
    return false;
  }
  startRow.forEach((field, fieldIndex) => {
    if (field === player) {
      traverseBoard(player, 0, fieldIndex);
    }
  });
  return false;
};

export const checkWinner = (board: Board, player: Player) => {
  const boardToCheck = player === 'player2' ? flipBoard(board) : board;
  return checkPlayersBoard(boardToCheck, player);
};
