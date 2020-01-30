import * as Hapi from 'typesafe-hapi';
import * as Joi from 'typesafe-joi';
import Boom from '@hapi/boom';
import { GAME_UPDATE, GAME_FORFEIT } from '../roomEvents';
import { getRoom, resetGame } from '../rooms';
import { selectField } from '../../game/game';

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
      const { rowIndex, fieldIndex, client } = request.payload;
      const possibleRoom = getRoom(roomId);
      if (!possibleRoom) {
        return Boom.notFound('No such room!');
      }
      if (possibleRoom.player1 !== client && possibleRoom.player2 !== client) {
        return Boom.forbidden('You scummy hacker!');
      }
      const updatedGame = selectField({
        game: possibleRoom.game,
        player: possibleRoom.player1 === client ? 'player1' : 'player2',
        rowIndex,
        fieldIndex,
      });
      server.publish(`/room/${roomId}`, GAME_UPDATE(updatedGame));
      return true;
    },
  });

  server.route({
    method: 'POST',
    path: '/room/{roomId}/forfeit-game',
    options: {
      validate: {
        params: {
          roomId: Joi.string().required(),
        },
        payload: {
          client: Joi.string().required(),
        },
      },
    },
    handler(request, h) {
      if (!request.params || !request.payload) {
        return;
      }
      const roomId = request.params.roomId;
      const { client } = request.payload;
      const possibleRoom = getRoom(roomId);
      if (!possibleRoom) {
        return Boom.notFound('No such room!');
      }
      if (possibleRoom.player1 !== client && possibleRoom.player2 !== client) {
        return Boom.forbidden('You scummy hacker!');
      }
      const player = possibleRoom.player1 === client ? 'player1' : 'player2';
      const updatedGame = resetGame(possibleRoom);
      server.publish(
        `/room/${roomId}`,
        GAME_FORFEIT({
          game: updatedGame,
          loser: player,
        }),
      );
      return true;
    },
  });
};
