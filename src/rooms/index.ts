import * as Hapi from 'typesafe-hapi';
import { createRoomRoute } from './routes/createRoomRoute';
import { getRoomRoute } from './routes/getRoomRoute';

export const addRoomRoutes = (server: Hapi.Server) => {
  createRoomRoute(server);
  getRoomRoute(server);
};
