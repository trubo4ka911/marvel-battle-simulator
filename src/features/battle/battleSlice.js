// src/features/battle/battleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contenders: [],
  results: null,
  narrative: "",
};

const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    addContender: (state, action) => {
      state.contenders.push(action.payload);
    },
    resetBattle: (state) => {
      state.contenders = [];
      state.results = null;
      state.narrative = "";
    },
    setResults: (state, action) => {
      state.results = action.payload.winner;
      state.narrative = action.payload.narrative;
    },
  },
});

export const { addContender, resetBattle, setResults } = battleSlice.actions;
export default battleSlice.reducer;
