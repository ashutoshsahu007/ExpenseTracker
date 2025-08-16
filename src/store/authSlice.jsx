// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: null,
  userId: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;

      // persist to localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("loginTime", Date.now());
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;

      // clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("loginTime");
    },
    autoLogin(state) {
      const storedToken = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("userId");
      const storedLoginTime = localStorage.getItem("loginTime");

      if (
        storedToken &&
        storedUserId &&
        storedLoginTime &&
        Date.now() - storedLoginTime < 5 * 60 * 1000
      ) {
        state.token = storedToken;
        state.userId = storedUserId;
        state.isLoggedIn = true;
      } else {
        localStorage.clear();
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
