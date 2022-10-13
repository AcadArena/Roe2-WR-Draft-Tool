import { useContext } from "react";
import { socketContext, socketDispatchContext } from "./socket.context";

export const useSocket = () => useContext(socketContext);

export const useWsDispatch = () => useContext(socketDispatchContext);
