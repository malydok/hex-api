import { RoomDigest, Room } from './room.types';
import { Game, Player } from '../game/game.types';

const createEvent = <T>(name: string) => (payload?: T) => ({
  type: name,
  payload,
});

export const ROOMS_SETUP = createEvent<RoomDigest[]>('ROOMS_SETUP');
export const ROOMS_CHANGE = createEvent<RoomDigest[]>('ROOMS_CHANGE');

export const ROOM_FULL = createEvent('ROOM_FULL');
export const ROOM_SETUP = createEvent<Room>('ROOM_SETUP');
export const ROOM_UPDATE = createEvent<Room>('ROOM_UPDATE');

export const CHAT_MESSAGE = createEvent<{ message: string; client: string }>(
  'CHAT_MESSAGE',
);

export const GAME_UPDATE = createEvent<Game>('GAME_UPDATE');
export const GAME_FORFEIT = createEvent<{ game: Game; loser: Player }>(
  'GAME_UPDATE',
);
