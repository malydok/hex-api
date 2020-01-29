import { Room, RoomDigest, RoomSubscribe, DeletionTimers } from './room.types';
import { createGame } from '../game/game';

export let rooms: Room[] = [];

export const getRoomsWithoutGame = (): RoomDigest[] =>
  rooms.map(room => ({
    ...room,
    game: null,
  }));

const roomsSubscribers: RoomSubscribe[] = [];

const roomsUpdated = () =>
  void roomsSubscribers.forEach(callback => callback(getRoomsWithoutGame()));

export const subscribeToRoomsUpdates = (callback: RoomSubscribe) =>
  void roomsSubscribers.push(callback);

// TODO: throttle
const cleanRooms = () => {
  rooms = rooms.filter(room => !room.forDeletion);
  roomsUpdated();
};

const DELETION_TIMEOUT = 5000;
const deletionTimers: DeletionTimers = {};
const markForDeletion = (room: Room) => {
  room.forDeletion = true;
  deletionTimers[room.id] = setTimeout(() => {
    cleanRooms();
    delete deletionTimers[room.id];
  }, DELETION_TIMEOUT);
  console.log(`${room.id} marked for deletion`);
};
const saveFromDeletion = (room: Room) => {
  room.forDeletion = false;
  clearTimeout(deletionTimers[room.id]);
  delete deletionTimers[room.id];
  console.log(`${room.id} restored from deletion`);
};

export const addRoom = (id: string) => {
  rooms.push({
    id,
    player1: null,
    player2: null,
    game: createGame(),
    forDeletion: false,
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
