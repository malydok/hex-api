import nes from '@hapi/nes';

declare module 'typesafe-hapi' {
  interface Server {
    broadcast(message: any, options?: nes.ServerBroadcastOptions): void;
    subscription(path: string, options?: nes.ServerSubscriptionOptions): void;
    publish(
      path: string,
      message: any,
      options?: nes.ServerPublishOptions
    ): void;
    eachSocket(
      each: (socket: nes.Socket) => void,
      options?: nes.ServerEachSocketOptions
    ): void;
  }
}
