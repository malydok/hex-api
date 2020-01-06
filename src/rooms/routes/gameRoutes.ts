import * as Hapi from 'typesafe-hapi';
import * as Joi from 'typesafe-joi';
import Boom from '@hapi/boom';
import { GAME_UPDATE } from '../roomEvents';
import { getRoom } from '../rooms';
import { selectField } from '../game';

export const gameRoutes = (server: Hapi.Server) => {
  server.route({
    method: 'POST',
    path: '/room/{roomId}/select-field',
    options: {
      validate: {
        params: {
          roomId: Joi.string().required(),
        },
        payload: {
          rowIndex: Joi.number().required(),
          fieldIndex: Joi.number().required(),
          client: Joi.string().required(),
        },
      },
    },
    handler(request, h) {
      if (!request.params || !request.payload) {
        return;
      }
      const roomId = request.params.roomId;
      const possibleRoom = getRoom(roomId);
      if (!possibleRoom) {
        return Boom.notFound('No such room!');
      }
      const updatedGame = selectField({
        game: possibleRoom.game,
        ...request.payload,
      });
      server.publish(`/room/${roomId}`, GAME_UPDATE(updatedGame));
      return true;
    },
  });
};
