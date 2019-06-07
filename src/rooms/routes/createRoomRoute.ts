import * as Hapi from 'typesafe-hapi';
import * as UUID from 'uuid';
import { addRoom } from '../rooms';
import { createRoomSubscriptions } from '../createRoomSubscriptions';

export const createRoomRoute = (server: Hapi.Server) => {
  server.route({
    method: 'GET',
    path: '/room/create',
    handler() {
      const roomId = UUID.v4();
      addRoom(roomId);
      createRoomSubscriptions(server, roomId);
      console.log('room created', roomId);
      return { roomId };
    },
  });
};
