import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Champion } from "interface/champion";
const initialState: Record<string, Champion> = {};

type Action = PayloadAction<Record<string, Champion>>;
export const champsSlice = createSlice({
  name: "champs",
  initialState,
  reducers: {
    set: (_, action: Action) => {
      return action.payload;
    },
  },
});

export const { set: setChamps } = champsSlice.actions;
export default champsSlice.reducer;
