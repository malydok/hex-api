import * as Hapi from 'typesafe-hapi';
import { createRoomRoute } from './routes/createRoomRoute';
import { getRoomRoute } from './routes/getRoomRoute';
import { chatRoutes } from './routes/chatRoutes';
import { gameRoutes } from './routes/gameRoutes';

export const addRoomRoutes = (server: Hapi.Server) => {
  createRoomRoute(server);
  getRoomRoute(server);
  chatRoutes(server);
  gameRoutes(server);
};
