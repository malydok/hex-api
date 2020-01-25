import { Room } from './room.types';
import { createGame } from '../game/game';

const rooms: Room[] = [];

export const addRoom = (id: string) =>
  void rooms.push({
    id,
    player1: null,
    player2: null,
    game: createGame(),
  });

export const getRoom = (id: string) => rooms.find(room => room.id === id);

export const addPlayer = (roomId: string, clientId: string) => {
  const possibleRoom = getRoom(roomId);
  if (!possibleRoom) {
    throw Error(`No such room ${roomId}`);
  }
  if (possibleRoom.player1 && possibleRoom.player2) {
    throw Error(`Room full ${roomId}`);
  }
  if (!possibleRoom.player1) {
    possibleRoom.player1 = clientId;
  } else if (!possibleRoom.player2) {
    possibleRoom.player2 = clientId;
  }
  return possibleRoom;
};

export const removePlayer = (roomId: string, clientId: string) => {
  const possibleRoom = getRoom(roomId);
  if (!possibleRoom) {
    throw Error(`No such room ${roomId}`);
  }
  if (possibleRoom.player1 === clientId) {
    possibleRoom.player1 = null;
  }
  if (possibleRoom.player2 === clientId) {
    possibleRoom.player2 = null;
  }
  return possibleRoom;
};
