// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenseSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    auth: authReducer,
  },
});

export default store;
