import { Champion } from "./champion";

export type Status = "pending" | "active" | "complete";

export interface Ban {
  id: number;
  champion: Champion;
  status: Status;
}

export interface Pick {
  id: number;
  champion: Champion;
  status: Status;
  displayName: string;
}

export interface Team {
  isActive: boolean;
  picks: Array<Pick>;
  bans: Array<Ban>;
}

export interface State {
  status: "paused" | "running" | "completed";
  timer: number;
  teamA: Team;
  teamB: Team;
  currentSequence: number;
}
