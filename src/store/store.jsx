import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenseSlice";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import { SESSION_DURATION } from "../utils/data";

const storedToken = localStorage.getItem("token");
const storedUserId = localStorage.getItem("userId");
const storedLoginTime = Number(localStorage.getItem("loginTime"));

let isLoggedIn = false;
if (
  storedToken &&
  storedUserId &&
  storedLoginTime &&
  Date.now() - storedLoginTime < SESSION_DURATION
) {
  isLoggedIn = true;
}

const preloadedState = {
  auth: {
    token: storedToken,
    userId: storedUserId,
    isLoggedIn,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    theme: themeReducer,
  },
  preloadedState,
});

export default store;
