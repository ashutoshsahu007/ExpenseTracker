import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { darkMode: false, premiumActivated: false },
  reducers: {
    activatePremium(state) {
      state.premiumActivated = true;
      state.darkMode = true; // by default enable dark mode
    },
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { activatePremium, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
