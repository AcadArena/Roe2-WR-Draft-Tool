import { Champion } from "interface/champion";
import { State } from "interface/state";
import { io } from "socket.io-client";
import { globalDispatch, setState } from "store/";
import { setChamps } from "store/redux.champs.slice";

const URL = `${window.location.hostname}:1338`;

export const socket = io(URL);

socket.on("state", (state: State) => {
  globalDispatch(setState({ state }));
});

socket.on("champs", (champs: Record<string, Champion>) => {
  globalDispatch(setChamps(champs));
});
