import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { generateHash } from "../../utils/auth";

const API_PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY;
const API_PRIVATE_KEY = process.env.REACT_APP_API_PRIVATE_KEY;
const apiBaseURL = "https://gateway.marvel.com/v1/public";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async ({ limit, offset, searchTerm = "" }) => {
    const ts = Date.now();
    const hash = generateHash(ts, API_PRIVATE_KEY, API_PUBLIC_KEY);
    let url = `${apiBaseURL}/characters?ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}&limit=${limit}&offset=${offset}`;

    if (searchTerm) {
      url += `&nameStartsWith=${searchTerm}`;
    }

    const response = await axios.get(url);
    return {
      characters: response.data.data.results,
      total: response.data.data.total,
      searchTerm,
      offset,
    };
  }
);

const characterSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    status: "idle",
    error: null,
    total: 0,
    searchTerm: "",
  },
  reducers: {
    clearCharacters: (state) => {
      state.characters = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (
          action.payload.offset === 0 ||
          action.payload.searchTerm !== state.searchTerm
        ) {
          state.characters = action.payload.characters;
        } else {
          state.characters = [
            ...state.characters,
            ...action.payload.characters,
          ];
        }
        state.total = action.payload.total;
        state.searchTerm = action.payload.searchTerm;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCharacters } = characterSlice.actions;
export default characterSlice.reducer;
