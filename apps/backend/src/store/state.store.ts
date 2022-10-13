import { Ban, Pick, State, Team } from "interface/state";
import { defaultState } from "utils/defaultValues";

export let state: State = defaultState;

export const setState = (payload: Partial<State>) => {
  state = { ...state, ...payload };
  return state;
};

export const decrementTimer = (num: number = 1) => {
  const newTime = state.timer - num;
  return setState({ timer: newTime <= 0 ? 0 : newTime, status: "running" });
};

export const getTeam = (team: "teamA" | "teamB") => {
  return state[team];
};

export const setTeam = (team: "teamA" | "teamB", payload: Partial<Team>) => {
  if (team === "teamA") {
    return setState({ teamA: { ...state.teamA, ...payload } });
  }
  return setState({ teamB: { ...state.teamB, ...payload } });
};

export const setPicks = (team: "teamA" | "teamB", payload: Array<Pick>) => {
  return setTeam(team, { picks: payload });
};

export const setPick = (
  side: "teamA" | "teamB",
  id: number,
  payload: Partial<Pick>
) => {
  const newPicks = getTeam(side).picks.map((val) =>
    val.id === id ? { ...val, ...payload } : val
  );
  return setPicks(side, newPicks);
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
