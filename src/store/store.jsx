import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenseSlice";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import { SESSION_DURATION } from "../utils/data";

const storedToken = localStorage.getItem("token");
const storedUserId = localStorage.getItem("userId");
const storedLoginTime = Number(localStorage.getItem("loginTime"));
const storedMode = localStorage.getItem("darkMode");

console.log(storedMode, "storeddddmoddddde");

let isLoggedIn = false;
let darkMode = false;

if (
  storedToken &&
  storedUserId &&
  storedLoginTime &&
  Date.now() - storedLoginTime < SESSION_DURATION
) {
  isLoggedIn = true;
}

if (storedMode === "true") {
  darkMode = storedMode;
  console.log("inside if block man");
}

const preloadedState = {
  auth: {
    token: storedToken,
    userId: storedUserId,
    isLoggedIn,
  },
  theme: {
    darkMode: darkMode,
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
