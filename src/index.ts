import * as UUID from 'uuid';
import * as Hapi from 'typesafe-hapi';
import * as Joi from 'typesafe-joi';
import * as Nes from '@hapi/nes';
import { Socket, ServerSubscriptionOptions } from '@hapi/nes';

interface Room {
  id: string;
  players: string[];
}
const rooms: Room[] = [];

const init = async () => {
  const server = new Hapi.Server({
    port: 3000,
    host: 'localhost',
  });
  await server.register(Nes as any);

  server.route({
    method: 'GET',
    path: '/room/create',
    handler(request, h) {
      const roomId = UUID.v4();
      const newRoom: Room = {
        id: roomId,
        players: [],
      };
      rooms.push(newRoom);
      console.log('room created', roomId);

      server.subscription(`/room/${roomId}`, {
        onSubscribe(socket: Socket, path: string) {
          console.log(`player entered /room/${roomId}: ${socket.id}`);
          if (newRoom.players.length < 2) {
            newRoom.players.push(socket.id);
            server.publish(`/room/${roomId}`, {
              type: 'PLAYER_JOINED',
              playerId: socket.id,
            });
          }
        },
        onUnsubscribe(socket: Socket, path: string) {
          console.log(`player left /room/${roomId}: ${socket.id}`);
          newRoom.players = newRoom.players.filter(
            player => player !== socket.id,
          );
          server.publish(`/room/${roomId}`, {
            type: 'PLAYER_LEFT',
            playerId: socket.id,
          });
        },
      } as ServerSubscriptionOptions);

      return { roomId };
    },
  });

  server.route({
    method: 'GET',
    path: '/room/{roomId}',
    options: {
      validate: {
        params: {
          roomId: Joi.string().required(),
        },
      },
    },
    handler(request, h) {
      if (!request.params) {
        return;
      }
      const roomId = request.params.roomId;
      const possibleRoom = rooms.find(room => room.id === roomId);
      if (possibleRoom) {
        return { possibleRoom };
      }
      return 'No such room idiot!';
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
