import { defaultState } from "../lib/defaultValues";
import { Ban, Pick, State, Team } from "../types/state";

export let state: State = defaultState;

export const setState = (payload: Partial<State>) => {
  state = { ...state, ...payload };
  return state;
};

export const decrementTimer = (num: number = 1) => {
  const newTime = state.timer - num;
  return setState({ timer: newTime <= 0 ? 0 : newTime });
};

export const getTeam = (team: "teamA" | "teamB") => {
  return state[team];
};

export const setTeam = (team: "teamA" | "teamB", payload: Partial<Team>) => {
  return setState({ [team]: { ...state[team], ...payload } });
};

export const setPicks = (team: "teamA" | "teamB", payload: Array<Pick>) => {
  return setTeam(team, { picks: payload });
};

export const setPick = (
  team: "teamA" | "teamB",
  id: number,
  payload: Partial<Pick>
) => {
  const picks = getTeam(team).picks;
  if (picks[id]) {
    picks[id] = { ...picks[id], ...payload };
  }
  return setPicks(team, picks);
};

export const setBans = (team: "teamA" | "teamB", payload: Array<Ban>) => {
  return setTeam(team, { bans: payload });
};

export const setBan = (
  team: "teamA" | "teamB",
  id: number,
  payload: Partial<Ban>
) => {
  const bans = getTeam(team).bans;
  if (bans[id]) {
    bans[id] = { ...bans[id], ...payload };
  }
  return setBans(team, bans);
};
