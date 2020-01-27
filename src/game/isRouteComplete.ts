import { Board, Field, Player, BoardPosition } from './game.types';
type TraversingField = Field | 'traversed';
type TraversingBoard = TraversingField[][];

const inRange = (value: number, min: number, max: number) =>
  value >= min && value <= max;

export const isRouteComplete = (
  board: Board,
  player: Player,
  startPos: BoardPosition,
) => {
  const traversingBoard: TraversingBoard = JSON.parse(JSON.stringify(board));
  const lastRow = traversingBoard.length - 1;
  const neighbors = [
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
  ];

  const withinBoard = ([row, col]: BoardPosition) =>
    inRange(row, 0, traversingBoard.length - 1) &&
    inRange(col, 0, traversingBoard.length - 1);

  const playersField = ([row, col]: BoardPosition) =>
    traversingBoard[row][col] === player &&
    traversingBoard[row][col] !== 'traversed';

  const isNeighbor = (pos: BoardPosition) =>
    withinBoard(pos) && playersField(pos);

  const neighboringFields = ([row, col]: BoardPosition) =>
    neighbors
      .map(
        ([diffRow, diffCol]): BoardPosition => [row + diffRow, col + diffCol],
      )
      .filter(isNeighbor);

  const traverseBoard = (
    [row, col]: BoardPosition,
    endpoints: BoardPosition[] = [],
  ) => {
    traversingBoard[row][col] = 'traversed';
    const neighbors = neighboringFields([row, col]);
    if (neighbors.length === 0 || row === lastRow) {
      return endpoints.concat([[row, col]]);
    }
    neighbors.forEach(neighbor => {
      endpoints = traverseBoard(neighbor, endpoints);
    });
    return endpoints;
  };

  const endpoints = traverseBoard(startPos);
  return endpoints.length > 0;
};
