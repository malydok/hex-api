import { Board } from '../src/game/game.types';
import { flipBoard } from '../src/game/flipBoard';

test('flipBoard works correctly', () => {
  const input: Board = [
    ['player1', 'player1'],
    ['player2', 'player2'],
  ];
  const expected: Board = [
    ['player1', 'player2'],
    ['player1', 'player2'],
  ];

  expect(flipBoard(input)).toEqual(expected);
});
