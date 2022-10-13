import { SocketEvent } from "interface/socket";
import type { Server } from "socket.io";
import { decrementTimer, setState } from "../store/state.store";

export class TickManager {
  wsServer: Server;
  timeout?: NodeJS.Timeout;
  tickRate = 1;
  interval = 1000;
  active: boolean = false;

  constructor(ws: Server) {
    this.wsServer = ws;
  }

  start() {
    console.log(`Ticker started with tick rate: ${this.tickRate} tick/s `);
    if (this.active) return;
    this.active = true;
    this.timeout = setInterval(() => {
      this.wsServer.emit(SocketEvent.State, decrementTimer());
    }, this.interval / this.tickRate);
  }

  pause(emit = true) {
    this.active = false;
    if (emit) {
      this.wsServer.emit(SocketEvent.State, setState({ status: "paused" }));
    }
    clearInterval(this.timeout);
  }
}
