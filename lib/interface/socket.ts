import { State } from "./state";

export type SequenceActionProps = {
  sequenceIndex: number;
  champion: string;
  type: "hover" | "finalize";
};
export type SequenceAction = (props: SequenceActionProps) => void;

export type SwapProps = {
  side: Side;
  active: number;
  over: number;
};
export type Swap = (props: SwapProps) => void;

export type Side = "teamA" | "teamB";
export type SetPlayerProps = { team: Side; id: number; displayName: string };
export type SetPlayer = (props: SetPlayerProps) => void;

export type SetState = (state: Partial<State>) => void;

export enum SocketEvent {
  Champs = "champs",
  Reset = "resetAll",
  Start = "start",
  Pause = "pause",
  SequenceAction = "sequenceAction",
  Swap = "swap",
  SetPlayer = "setPlayer",
  State = "state",
}

export interface SocketDispatch extends Record<SocketEvent, Function> {
  swap: Swap;
  resetAll: VoidFunction;
  start: VoidFunction;
  pause: VoidFunction;
  sequenceAction: SequenceAction;
  setPlayer: SetPlayer;
  state: SetState;
}
