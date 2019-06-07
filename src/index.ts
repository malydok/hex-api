import { startServer } from './server';

startServer();

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});
