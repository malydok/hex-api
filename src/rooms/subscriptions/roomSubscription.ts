import * as Hapi from 'typesafe-hapi';
import { Socket, ServerSubscriptionOptions } from '@hapi/nes';
import { addPlayer, removePlayer } from '../rooms';
import { ROOM_FULL, ROOM_SETUP, ROOM_UPDATE } from '../roomEvents';

export const roomSubscription = (server: Hapi.Server, roomId: string) => {
  server.subscription(`/room/${roomId}`, {
    onSubscribe(socket: Socket, path: string) {
      console.log(`player entered /room/${roomId}: ${socket.id}`);
      try {
        const room = addPlayer(roomId, socket.id);
        socket.publish(`/room/${roomId}`, ROOM_SETUP(room));
        server.publish(`/room/${roomId}`, ROOM_UPDATE(room));
      } catch (error) {
        socket.publish(`/room/${roomId}`, ROOM_FULL());
        console.log(error.message);
      }
    },
    onUnsubscribe(socket: Socket, path: string) {
      console.log(`player left /room/${roomId}: ${socket.id}`);
      try {
        const room = removePlayer(roomId, socket.id);
        server.publish(`/room/${roomId}`, ROOM_UPDATE(room));
      } catch (error) {
        console.log(error.message);
      }
    },
  } as ServerSubscriptionOptions);
};
