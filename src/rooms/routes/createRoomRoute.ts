import * as Hapi from 'typesafe-hapi';
import { hri } from 'human-readable-ids';
import { addRoom } from '../rooms';
import { roomSubscription } from '../subscriptions/roomSubscription';

export const createRoomRoute = (server: Hapi.Server) => {
  server.route({
    method: 'GET',
    path: '/room/create',
    handler() {
      const roomId = hri.random();
      addRoom(roomId);
      roomSubscription(server, roomId);
      console.log('room created', roomId);
      return { roomId };
    },
  });
};
