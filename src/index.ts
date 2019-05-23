import * as Crypto from 'crypto';
import * as Hapi from 'typesafe-hapi';
import * as Joi from 'typesafe-joi';

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

  server.route({
    method: 'GET',
    path: '/createRoom',
    handler(request, h) {
      const roomId = Crypto.createHash('sha1').digest('hex');
      const newRoom = {
        id: roomId,
        players: [],
      };
      rooms.push(newRoom);
      console.log('New room created', newRoom);
      return h.redirect(`/room/${roomId}`);
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
        possibleRoom.players.push('player1');
        return JSON.stringify(possibleRoom);
      }
      return 'No such room!';
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
