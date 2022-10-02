import { createSlice } from "@reduxjs/toolkit";

const initialState = "notification messages go here";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      const newNotification = action.payload;
      return newNotification;
    },
    removeNotification(state, action) {
      return "";
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
