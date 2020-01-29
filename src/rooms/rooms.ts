import { Room, RoomDigest, RoomSubscribe, DeletionTimers } from './room.types';
import { createGame } from '../game/game';

export const rooms: Room[] = [];

export const getRoomsWithoutGame = (): RoomDigest[] =>
  rooms.map(room => ({
    ...room,
    game: null,
  }));

const removeRoom = (roomIndex: number) => {
  rooms.splice(roomIndex, 1);
  roomsUpdated();
};

const DELETION_TIMEOUT = 5000;
const deletionTimers: DeletionTimers = {};
const markForDeletion = (room: Room) => {
  const roomIndex = rooms.findIndex(({ id }) => id === room.id);
  if (roomIndex === -1) {
    return;
  }
  deletionTimers[room.id] = setTimeout(() => {
    removeRoom(roomIndex);
    delete deletionTimers[room.id];
  }, DELETION_TIMEOUT);
};
const saveFromDeletion = (room: Room) => {
  clearTimeout(deletionTimers[room.id]);
  delete deletionTimers[room.id];
};

const roomsSubscribers: RoomSubscribe[] = [];

const roomsUpdated = () =>
  void roomsSubscribers.forEach(callback => callback(getRoomsWithoutGame()));

export const subscribeToRoomsUpdates = (callback: RoomSubscribe) =>
  void roomsSubscribers.push(callback);

export const addRoom = (id: string) => {
  rooms.push({
    id,
    player1: null,
    player2: null,
    game: createGame(),
  });
  roomsUpdated();
};

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
  saveFromDeletion(possibleRoom);
  roomsUpdated();
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
  if (!possibleRoom.player1 && !possibleRoom.player2) {
    markForDeletion(possibleRoom);
  }
  roomsUpdated();
  return possibleRoom;
};
