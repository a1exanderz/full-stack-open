import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const sortByVotes = (state) => {
  const sorted = [...state].sort((a, b) =>
    a.votes > b.votes ? 1 : a.votes < b.votes ? -1 : 0
  );
  return sorted;
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    updateAnecdotes(state, action) {
      return sortByVotes(state).map((a) =>
        a.id !== action.payload.id ? a : action.payload
      );
    },
  },
});

export const { updateAnecdotes, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const incrementVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote);
    dispatch(updateAnecdotes(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
