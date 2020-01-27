import { Board, Player } from './game.types';
import { flipBoard } from './flipBoard';
import { isRouteComplete } from './isRouteComplete';

const didPlayerWin = (board: Board, player: Player) => {
  const startRow = board[0];
  const endRow = board[board.length - 1];
  if (!startRow.includes(player) || !endRow.includes(player)) {
    return false;
  }
  for (let fieldIndex = 0; fieldIndex < startRow.length; fieldIndex++) {
    const field = startRow[fieldIndex];
    if (field === player && isRouteComplete(board, player, [0, fieldIndex])) {
      return true;
    }
  }
  return false;
};

export const checkWinner = (board: Board, player: Player) => {
  const boardToCheck = player === 'player2' ? flipBoard(board) : board;
  return didPlayerWin(boardToCheck, player);
};
