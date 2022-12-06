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
    incrementVote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((a) => a.id === id);
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return sortByVotes(state).map((a) => (a.id !== id ? a : updatedAnecdote));
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { incrementVote, appendAnecdote, setAnecdotes } =
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

export default anecdoteSlice.reducer;
