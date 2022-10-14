import type { Server as HttpServer } from "http";
import {
  SequenceActionProps,
  SetPlayerProps,
  Side,
  SocketEvent,
  SwapProps,
} from "interface/socket";
import type { Ban, Pick, State } from "interface/state";
import { Server } from "socket.io";
import { defaultState } from "utils/defaultValues";
import { draftSequence } from "utils/draftSequence";
import { tickManager } from ".";
import { sanitizedChampList } from "./lib/sanitizedChampList";
import { setPick, setPicks, setState, state } from "./store/state.store";

export const initWsServer = (httpServer: HttpServer) => {
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(`[${socket.id}] connected`);
    socket.emit(SocketEvent.State, state);
    socket.emit(SocketEvent.Champs, sanitizedChampList());

    socket.onAny((eventName: string, ...args: unknown[]) => {
      console.log(
        `[${socket.id}]: emitted ${eventName} with ${JSON.stringify(args[0])}`
      );
    });

    /* ====================================================================
          State
    ==================================================================== */
    socket.on(SocketEvent.State, (state: Partial<State>) => {
      io.emit(SocketEvent.State, setState(state));
    });

    socket.on(SocketEvent.Reset, () => {
      tickManager.pause();
      io.emit(SocketEvent.State, setState(defaultState));
    });

    /* ====================================================================
          Set Player
    ==================================================================== */

    socket.on(SocketEvent.SetPlayer, (payload: SetPlayerProps) => {
      const { team, id, displayName } = payload;
      io.emit(SocketEvent.State, setPick(team, id, { displayName }));
    });

    /* ====================================================================
          Sequence Action
    ==================================================================== */
    socket.on(SocketEvent.SequenceAction, (payload: SequenceActionProps) => {
      const { sequenceIndex, champion } = payload;
      const sequence = draftSequence.at(sequenceIndex);
      const champ = sanitizedChampList()[champion];
      if (!champ || !sequence) {
        return console.log(`[${socket.id}] Invalid sequence`);
      }

      const [side, action, actionId] = sequence;
      const isCurrent = state.currentSequence === sequenceIndex;
      const nextSequence = draftSequence.at(state.currentSequence + 1);
      const nextSequenceTeam = nextSequence?.[0];
      const nextSequenceAction = nextSequence?.[1];
      const nextSequenceId = nextSequence?.[2];
      const nextSequenceTimer = nextSequence?.[3] || 0;

      const processAction = <T extends Pick | Ban>(
        data: T,
        s: Side,
        a: "pick" | "ban"
      ): T => {
        if (data.id === actionId && side === s && action === a) {
          return {
            ...data,
            champion:
              !isCurrent && payload.type === "hover" ? data.champion : champ,
            status: payload.type === "finalize" ? "complete" : data.status,
          };
        }

        if (
          nextSequenceTeam === s &&
          nextSequenceAction === a &&
          nextSequenceId === data.id &&
          payload.type === "finalize"
        ) {
          return {
            ...data,
            status: !isCurrent ? data.status : "active",
          };
        }
        return data;
      };

      const aPicks = state.teamA.picks;
      const aBans = state.teamA.bans;
      const bPicks = state.teamB.picks;
      const bBans = state.teamB.bans;

      const aPicksNew = aPicks.map((p) => processAction(p, "teamA", "pick"));
      const aBansNew = aBans.map((p) => processAction(p, "teamA", "ban"));
      const bPicksNew = bPicks.map((p) => processAction(p, "teamB", "pick"));
      const bBansNew = bBans.map((p) => processAction(p, "teamB", "ban"));

      const teamA = {
        ...state.teamA,
        picks: aPicksNew,
        bans: aBansNew,
        isActive: [
          ...aPicksNew.map((p) => p.status === "active"),
          ...aBansNew.map((b) => b.status === "active"),
        ].some((i) => !!i),
      };

      const teamB = {
        ...state.teamB,
        picks: bPicksNew,
        bans: bBansNew,
        isActive: [
          ...bPicksNew.map((p) => p.status === "active"),
          ...bBansNew.map((b) => b.status === "active"),
        ].some((i) => !!i),
      };

      const data: Partial<State> = {
        currentSequence:
          !isCurrent && payload.type === "finalize"
            ? state.currentSequence
            : payload.type === "hover"
            ? state.currentSequence
            : isCurrent
            ? sequenceIndex + 1
            : state.currentSequence,
        timer:
          payload.type === "hover"
            ? state.timer
            : isCurrent
            ? nextSequenceTimer || state.timer
            : state.timer,
        teamA,
        teamB,
        status:
          state.currentSequence + 1 >= draftSequence.length
            ? "completed"
            : state.status,
      };

      if (state.currentSequence + 1 >= draftSequence.length) {
        tickManager.pause(false);
      }
      io.emit(SocketEvent.State, setState(data));
    });

    /* ====================================================================
          Swap
    ==================================================================== */

    socket.on(SocketEvent.Swap, (payload: SwapProps) => {
      if (state.status !== "completed") return;

      const { active, over, side } = payload;

      const team = state[side];
      const overChamp = team.picks.at(over)?.champion;
      const activeChamp = team.picks.at(active)?.champion;

      if (!overChamp || !activeChamp) return;

      const newPicks = team.picks.map((p) =>
        p.id === active
          ? { ...p, champion: overChamp }
          : p.id === over
          ? { ...p, champion: activeChamp }
          : p
      );
      io.emit(SocketEvent.State, setPicks(side, newPicks));
    });

    /* ====================================================================
          Timers
    ==================================================================== */
    socket.on(SocketEvent.Start, () => {
      tickManager.start();
    });

    socket.on(SocketEvent.Pause, () => {
      tickManager.pause();
    });

    socket.on("disconnect", () => {
      console.log(`[${socket.id}] disconnected`);
    });
  });

  return io;
};
