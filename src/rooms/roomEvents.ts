import { Room } from './room.types';
import { Game } from '../game/game.types';

export const PLAYER_JOINED = (room: Room) => ({
  type: 'PLAYER_JOINED',
  payload: room,
});
export const PLAYER_LEFT = (room: Room) => ({
  type: 'PLAYER_LEFT',
  payload: room,
});

export const CHAT_MESSAGE = (payload: { message: string; client: string }) => ({
  type: 'CHAT_MESSAGE',
  payload,
});

export const GAME_UPDATE = (payload: Game) => ({
  type: 'GAME_UPDATE',
  payload,
});
