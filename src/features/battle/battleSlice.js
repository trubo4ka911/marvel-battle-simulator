// src/features/battle/battleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contenders: [],
  results: null,
};

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    addContender: (state, action) => {
      state.contenders.push(action.payload);
    },
    resetBattle: (state) => {
      state.contenders = [];
      state.results = null;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { addContender, resetBattle, setResults } = battleSlice.actions;

export default battleSlice.reducer;
