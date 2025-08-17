// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenseSlice";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});

export default store;
