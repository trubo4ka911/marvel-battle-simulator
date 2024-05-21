// src/features/characters/characterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { generateHash } from "../../utils/auth";

const API_PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY;
const API_PRIVATE_KEY = process.env.REACT_APP_API_PRIVATE_KEY;
const apiBaseURL = "https://gateway.marvel.com/v1/public";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async ({ limit = 20, offset = 0 }, { getState }) => {
    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp, API_PRIVATE_KEY, API_PUBLIC_KEY);
    const response = await axios.get(`${apiBaseURL}/characters`, {
      params: {
        ts: timeStamp,
        apikey: API_PUBLIC_KEY,
        hash,
        limit,
        offset,
      },
    });
    return response.data.data;
  }
);

const characterSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    status: "idle",
    error: null,
    total: 0, // Assuming you need to track total number of characters available
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.characters = [...state.characters, ...action.payload.results]; // Append new characters
        state.total = action.payload.total; // Update total count
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default characterSlice.reducer;
