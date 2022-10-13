import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "interface/state";
import { defaultState } from "utils/defaultValues";
const initialState: State = defaultState;

export type StatePayload = { state: Partial<State> };
type Action = PayloadAction<StatePayload>;
export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    set: (state, action: Action) => {
      return { ...state, ...action.payload.state };
    },
  },
});

export const { set: setState } = stateSlice.actions;
export default stateSlice.reducer;
