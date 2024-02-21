import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/persistance-storage";

const initialState = {
  isLoading: false,
  loggedIn: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //Login
    signUserStart: (state) => {
      state.isLoading = true;
    },
    signUserSuccess: (state, action) => {
      state.isLoading = false;
      state.loggedIn = true;
      state.user = action.payload;
      setItem("token", action.payload.token);
    },
    signUserFailure: (state, action) => {
      state.isLoading = true;
      state.error = action;
    },
    logOutUser: (state) => {
      state.isLoading = true;
      state.loggedIn = false;
      state.user = null;
    },
  },
});

export const { signUserStart, signUserSuccess, signUserFailure, logOutUser } =
  authSlice.actions;
export default authSlice.reducer;
