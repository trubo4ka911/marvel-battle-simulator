import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./features/characters/characterSlice";
import battleReducer from "./features/battle/battleSlice";

export const store = configureStore({
  reducer: {
    characters: characterReducer,
    battle: battleReducer,
  },
});
