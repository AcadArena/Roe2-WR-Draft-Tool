import { configureStore } from "@reduxjs/toolkit";
import champs from "./redux.champs.slice";
import state from "./redux.state.slice";

export const reduxStore = configureStore({
  reducer: { state, champs },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export const globalDispatch = reduxStore.dispatch;
