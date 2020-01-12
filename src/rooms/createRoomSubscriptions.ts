import * as Hapi from 'typesafe-hapi';
import { Socket, ServerSubscriptionOptions } from '@hapi/nes';
import { addPlayer, removePlayer } from './rooms';
import { PLAYER_JOINED, PLAYER_LEFT } from './roomEvents';

export const createRoomSubscriptions = (
  server: Hapi.Server,
  roomId: string,
) => {
  server.subscription(`/room/${roomId}`, {
    onSubscribe(socket: Socket, path: string) {
      console.log(`player entered /room/${roomId}: ${socket.id}`);
      try {
        addPlayer(roomId, socket.id);
        server.publish(`/room/${roomId}`, PLAYER_JOINED(socket.id));
      } catch (error) {
        console.log(error.message);
      }
    },
    onUnsubscribe(socket: Socket, path: string) {
      console.log(`player left /room/${roomId}: ${socket.id}`);
      try {
        removePlayer(roomId, socket.id);
        server.publish(`/room/${roomId}`, PLAYER_LEFT(socket.id));
      } catch (error) {
        console.log(error.message);
      }
    },
  } as ServerSubscriptionOptions);
};