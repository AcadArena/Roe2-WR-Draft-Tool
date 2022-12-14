import { Champion } from "interface/champion";
import { State } from "interface/state";
import { io } from "socket.io-client";
import { globalDispatch, setState } from "store/";
import { setChamps } from "store/redux.champs.slice";

const env = import.meta.env.VITE_VERCEL_ENV;
const isProd = env === "production";
const DEV_URL = `${window.location.hostname}:1338`;
const PROD_URL = "https://servers.acadarena.com";
const URL = isProd ? PROD_URL : DEV_URL;
const PATH = isProd ? "/wr/socket.io" : "/socket.io";

const config = { host: URL, path: PATH };
export const socket = io(URL, {
  ...config,
  reconnection: true,
});

socket.on("state", (state: State) => {
  globalDispatch(setState({ state }));
});

socket.on("champs", (champs: Record<string, Champion>) => {
  globalDispatch(setChamps(champs));
});
