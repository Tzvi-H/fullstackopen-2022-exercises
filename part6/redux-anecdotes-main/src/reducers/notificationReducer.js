import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotification(state, action) {
      const newNotification = action.payload;
      return newNotification;
    },
    removeNotification(state, action) {
      return null;
    },
  },
});

const { updateNotification, removeNotification } = notificationSlice.actions;

export const setNotification = (notification, secondsDelay) => {
  return async (dispatch) => {
    dispatch(updateNotification(notification));
    setTimeout(() => {
      dispatch(removeNotification());
    }, secondsDelay * 1000);
  };
};

export default notificationSlice.reducer;
