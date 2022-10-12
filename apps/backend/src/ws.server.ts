import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { tickManager } from ".";
import { defaultState } from "./lib/defaultValues";
import { draftSequence } from "./lib/draftSequence";
import { championStore } from "./store";
import { setPick, setState, state } from "./store/state.store";
import { State } from "./types/state";

export const initWsServer = (httpServer: HttpServer) => {
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(`[${socket.id}] connected`);

    /* ====================================================================
          State
    ==================================================================== */
    socket.on("state", (state: Partial<State>) => {
      io.emit("state", setState(state));
    });

    socket.on("reset", () => {
      io.emit("state", setState(defaultState));
    });

    /* ====================================================================
          Set Player
    ==================================================================== */
    type Side = "teamA" | "teamB";
    type SetPlayerPayload = { team: Side; id: number; displayName: string };

    socket.on("setPlayer", (payload: SetPlayerPayload) => {
      const { team, id, displayName } = payload;
      io.emit("state", setPick(team, id, { displayName }));
    });

    /* ====================================================================
          Sequence Action
    ==================================================================== */
    type SequenceAction = { sequenceIndex: number; champion: string };
    socket.on("sequenceAction", (payload: SequenceAction) => {
      const { sequenceIndex, champion } = payload;
      const sequence = draftSequence.at(sequenceIndex);
      const champ = championStore.get(champion);
      if (!champ || !sequence) {
        return console.log(`[${socket.id}] Invalid sequence`);
      }

      const [side, action, actionId, timer] = sequence;
      const isCurrent = state.currentSequence === sequenceIndex;
      const actionProp = action === "pick" ? "picks" : "bans";
      const actionData = state[side][actionProp];

      if (!actionData[actionId])
        return console.log(`[${socket.id}] Sequence not found`);

      actionData[actionId] = { ...actionData[actionId], champion: champ };

      io.emit(
        "state",
        setState({
          timer: isCurrent ? timer : state.timer,
          [side]: { ...state[side], [actionProp]: actionData },
        })
      );
    });

    /* ====================================================================
          Timers
    ==================================================================== */
    socket.on("start", () => {
      tickManager.start();
    });

    socket.on("stop", () => {
      tickManager.stop();
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });

  return io;
};
