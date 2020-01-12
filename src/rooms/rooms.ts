import { Game, createGame } from './game';

export interface Room {
  id: string;
  players: string[];
  game: Game;
}

const rooms: Room[] = [];

export const addRoom = (id: string) =>
  void rooms.push({
    id,
    players: [],
    game: createGame(),
  });

export const getRoom = (id: string) => rooms.find(room => room.id === id);

export const addPlayer = (roomId: string, player: string) => {
  const possibleRoom = getRoom(roomId);
  if (!possibleRoom) {
    throw Error(`No such room ${roomId}`);
  }
  if (possibleRoom.players.length >= 2) {
    throw Error(`Room full ${roomId}`);
  }
  possibleRoom.players.push(player);
};

export const removePlayer = (roomId: string, playerId: string) => {
  const possibleRoom = getRoom(roomId);
  if (!possibleRoom) {
    throw Error(`No such room ${roomId}`);
  }
  possibleRoom.players = possibleRoom.players.filter(
    player => player !== playerId,
  );
};
