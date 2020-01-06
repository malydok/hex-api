import * as Hapi from 'typesafe-hapi';
import * as Joi from 'typesafe-joi';
import Boom from '@hapi/boom';
import { getRoom } from '../rooms';

export const getRoomRoute = (server: Hapi.Server) => {
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
      const possibleRoom = getRoom(roomId);
      if (!possibleRoom) {
        return Boom.notFound('No such room!');
      }
      return possibleRoom;
    },
  });
};
