import { SocketDispatch } from "interface/socket";
import { createContext } from "react";
import { Socket } from "socket.io-client";
import { socket } from "./socket.instance";

export const socketContext = createContext<Socket>(socket);

const noop = () => {};
// Dispatch actions
export const socketDispatchContext = createContext<
  Omit<SocketDispatch, "champs">
>({
  swap: noop,
  resetAll: noop,
  sequenceAction: noop,
  setPlayer: noop,
  start: noop,
  state: noop,
  pause: noop,
});
