import type { Server } from "socket.io";
import { decrementTimer } from "../store/state.store";

export class TickManager {
  wsServer: Server;
  timeout?: NodeJS.Timeout;
  tickRate = 1;
  interval = 1000;

  constructor(ws: Server) {
    this.wsServer = ws;
  }

  start() {
    console.log(`Ticker started with tick rate: ${this.tickRate} tick/s `);
    this.timeout = setInterval(() => {
      const newState = decrementTimer();
      this.wsServer.emit("state", newState);
    }, this.interval / this.tickRate);
  }

  stop() {
    if (!this.timeout) return;
    clearInterval(this.timeout);
  }
}
