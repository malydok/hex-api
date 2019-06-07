export interface Room {
  id: string;
  players: string[];
}

const rooms: Room[] = [];

export const addRoom = (id: string) =>
  void rooms.push({
    id,
    players: [],
  });
export const getRoom = (id: string) => rooms.find(room => room.id === id);

export const addPlayer = (roomId: string, player: string) => {
  const possibleRoom = getRoom(roomId);
  if (possibleRoom) {
    if (possibleRoom.players.length >= 2) {
      throw Error('Room full');
    }
    possibleRoom.players = [...possibleRoom.players, player];
  } else {
    throw Error('No such room');
  }
};
export const removePlayer = (roomId: string, playerId: string) => {
  const possibleRoom = getRoom(roomId);
  if (possibleRoom) {
    possibleRoom.players = possibleRoom.players.filter(
      player => player !== playerId,
    );
  } else {
    throw Error('No such room');
  }
};
