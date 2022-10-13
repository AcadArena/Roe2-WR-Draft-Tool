import { PropsWithChildren } from "react";
import { socketContext, socketDispatchContext } from "./socket.context";
import {
  pause,
  resetAll,
  sequenceAction,
  setPlayer,
  setState,
  start,
  swap,
} from "./socket.emits";
import { socket } from "./socket.instance";
const SocketProvider = ({ children }: PropsWithChildren) => {
  return (
    <socketContext.Provider value={socket}>
      <socketDispatchContext.Provider
        value={{
          swap,
          resetAll,
          sequenceAction,
          setPlayer,
          start,
          state: setState,
          pause,
        }}
      >
        {children}
      </socketDispatchContext.Provider>
    </socketContext.Provider>
  );
};

export default SocketProvider;
