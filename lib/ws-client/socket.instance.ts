import { Champion } from "interface/champion";
import { State } from "interface/state";
import { io } from "socket.io-client";
import { globalDispatch, setState } from "store/";
import { setChamps } from "store/redux.champs.slice";

const isDev = import.meta.env.DEV;
const DEV_URL = `${window.location.hostname}:1338`;
const PROD_URL = "https://servers.acadarena.com/wr";
const URL = isDev ? DEV_URL : PROD_URL;
const PATH = isDev ? "/socket.io" : "/wr/socket.io";

export const socket = io({
  host: URL,
  path: PATH,
});

socket.on("state", (state: State) => {
  globalDispatch(setState({ state }));
});

socket.on("champs", (champs: Record<string, Champion>) => {
  globalDispatch(setChamps(champs));
});
