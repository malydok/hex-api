import { Game } from '../game/game.types';

export interface Room {
  id: string;
  player1: string | null;
  player2: string | null;
  game: Game;
}
