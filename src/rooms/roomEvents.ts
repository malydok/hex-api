import { RoomDigest, Room } from './room.types';
import { Game } from '../game/game.types';

export const ROOMS_SETUP = (rooms: RoomDigest[]) => ({
  type: 'ROOMS_SETUP',
  payload: rooms,
});
export const ROOMS_CHANGE = (rooms: RoomDigest[]) => ({
  type: 'ROOMS_CHANGE',
  payload: rooms,
});

export const ROOM_FULL = () => ({
  type: 'ROOM_FULL',
});
export const ROOM_SETUP = (room: Room) => ({
  type: 'ROOM_SETUP',
  payload: room,
});
export const ROOM_UPDATE = (room: Room) => ({
  type: 'ROOM_UPDATE',
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
