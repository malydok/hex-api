import { Game } from '../game/game.types';

export interface RoomDigest {
  id: string;
  player1: string | null;
  player2: string | null;
}

export interface Room extends RoomDigest {
  game: Game;
}

export type RoomSubscribe = (rooms: RoomDigest[]) => void;

export interface DeletionTimers {
  [key: string]: NodeJS.Timeout;
}
