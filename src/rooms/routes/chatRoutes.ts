import * as Hapi from 'typesafe-hapi';
import * as Joi from 'typesafe-joi';
import { CHAT_MESSAGE } from '../roomEvents';

export const chatRoutes = (server: Hapi.Server) => {
  server.route({
    method: 'POST',
    path: '/room/{roomId}/add-message',
    options: {
      validate: {
        params: {
          roomId: Joi.string().required(),
        },
        payload: {
          message: Joi.string().required(),
          client: Joi.string().required(),
        },
      },
    },
    handler(request, h) {
      if (!request.params || !request.payload) {
        return;
      }
      const roomId = request.params.roomId;
      server.publish(`/room/${roomId}`, CHAT_MESSAGE(request.payload));
      return true;
    },
  });
};
