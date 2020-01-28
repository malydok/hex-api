import * as Hapi from 'typesafe-hapi';
import * as Nes from '@hapi/nes';
import { addRoomRoutes } from './rooms/addRoomRoutes';

export const startServer = async () => {
  const server = new Hapi.Server({
    port: process.env.PORT || 3000,
    host: 'localhost',
  });

  await server.register(Nes as any);
  await server.start();
  addRoomRoutes(server);
  console.log('Server running on %s', server.info.uri);
};
