import {
  SequenceActionProps,
  SetPlayerProps,
  SocketEvent,
  SwapProps,
} from "interface/socket";
import type { State } from "interface/state";
import { socket } from "./socket.instance";

export const resetAll = () => {
  socket.emit(SocketEvent.Reset);
};

export const start = () => {
  socket.emit(SocketEvent.Start);
};

export const pause = () => {
  socket.emit(SocketEvent.Pause);
};

export const sequenceAction = (props: SequenceActionProps) => {
  socket.emit(SocketEvent.SequenceAction, props);
};

export const setPlayer = (props: SetPlayerProps) => {
  socket.emit(SocketEvent.SetPlayer, props);
};

export const setState = (state: Partial<State>) => {
  socket.emit(SocketEvent.State, state);
};

export const swap = (props: SwapProps) => {
  socket.emit(SocketEvent.Swap, props);
};
