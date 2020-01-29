import * as Hapi from 'typesafe-hapi';
import { Socket, ServerSubscriptionOptions } from '@hapi/nes';
import { subscribeToRoomsUpdates, getRoomsWithoutGame } from '../rooms';
import { ROOMS_CHANGE, ROOMS_SETUP } from '../roomEvents';

export const roomListSubscription = (server: Hapi.Server) => {
  subscribeToRoomsUpdates(rooms => {
    console.log(rooms);
    server.publish(`/room`, ROOMS_CHANGE(rooms));
  });

  server.subscription(`/room`, {
    onSubscribe(socket: Socket, path: string) {
      try {
        socket.publish(`/room`, ROOMS_SETUP(getRoomsWithoutGame()));
      } catch (error) {
        console.log(error.message);
      }
    },
  } as ServerSubscriptionOptions);
};
