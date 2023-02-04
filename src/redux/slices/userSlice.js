import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";

const userSlice = createSlice({
  name: "user",
  initialState: initState.user,
  reducers: {
    userAdd(state, actions) {
      return {
        ...state,
        _id: actions.payload.data._id,
        name: actions.payload.data.name,
        about: actions.payload.data.about,
        avatar: actions.payload.data.avatar,
        group: actions.payload.data.group,
        email: actions.payload.data.email,
        token: actions.payload.token,
      };
    },
    userRemove(state) {
      Object.keys(state).forEach((key) => (state[key] = ""));
    },
  },
});

export const { userAdd, userRemove } = userSlice.actions;

export const getTokenSelector = (state) => state.user.token;

export const userReducer = userSlice.reducer;
