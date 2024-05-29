// src/features/characters/characterSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { generateHash } from "../../utils/auth";

const API_PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY;
const API_PRIVATE_KEY = process.env.REACT_APP_API_PRIVATE_KEY;
const apiBaseURL = "https://gateway.marvel.com/v1/public";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async () => {
    const ts = Date.now();
    const hash = generateHash(ts, API_PRIVATE_KEY, API_PUBLIC_KEY);
    const url = `${apiBaseURL}/characters?ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;

    const response = await axios.get(url);
    return response.data.data.results;
  }
);

const characterSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default characterSlice.reducer;
