import { Game } from './game';

export const PLAYER_JOINED = (playerId: string) => ({
  type: 'PLAYER_JOINED',
  playerId,
});
export const PLAYER_LEFT = (playerId: string) => ({
  type: 'PLAYER_LEFT',
  playerId,
});

export const CHAT_MESSAGE = (payload: { message: string; client: string }) => ({
  type: 'CHAT_MESSAGE',
  payload,
});

export const GAME_UPDATE = (payload: Game) => ({
  type: 'GAME_UPDATE',
  payload,
});
