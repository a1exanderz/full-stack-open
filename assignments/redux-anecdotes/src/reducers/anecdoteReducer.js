import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

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
    createNewAnecdote(state, action) {
      const content = action.payload;
      state.push({
        content,
        votes: 0,
        id: getId(),
      });
    },
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
  },
});

export const { createNewAnecdote, incrementVote, appendAnecdote } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
