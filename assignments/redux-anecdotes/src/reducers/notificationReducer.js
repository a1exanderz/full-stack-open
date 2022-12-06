import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    displayVoteNotification(state, action) {
      const notif = { type: "vote", content: action.payload };
      state[0] = notif;
    },
    displayNewEntryNotification(state, action) {
      const notif = { type: "newEntry", content: action.payload };
      state[0] = notif;
    },
  },
});

export const { displayVoteNotification, displayNewEntryNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
