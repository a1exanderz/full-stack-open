import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    content: "test notification",
  },
];

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    displayNotification(state, action) {
      const notif = action.payload;
      state.push({
        notif,
      });
    },
  },
});

export const { displayNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
