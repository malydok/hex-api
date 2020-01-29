import * as Hapi from 'typesafe-hapi';
import { createRoomRoute } from './routes/createRoomRoute';
import { chatRoutes } from './routes/chatRoutes';
import { gameRoutes } from './routes/gameRoutes';
import { roomListSubscription } from './subscriptions/roomListSubscription';

export const addRoomRoutes = (server: Hapi.Server) => {
  createRoomRoute(server);
  chatRoutes(server);
  gameRoutes(server);
  roomListSubscription(server);
};
