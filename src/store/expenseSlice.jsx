import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    list: [],
    editId: null,
  },
  reducers: {
    setExpenses(state, action) {
      state.list = action.payload;
    },
    addExpense(state, action) {
      state.list.unshift(action.payload);
    },
    updateExpense(state, action) {
      const { id, data } = action.payload;
      state.list = state.list.map((exp) =>
        exp.id === id ? { id, ...data } : exp
      );
    },
    deleteExpense(state, action) {
      state.list = state.list.filter((exp) => exp.id !== action.payload);
    },
    setEditId(state, action) {
      state.editId = action.payload;
    },
    clearEditId(state) {
      state.editId = null;
    },
  },
});

export const {
  setExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  setEditId,
  clearEditId,
} = expenseSlice.actions;
export default expenseSlice.reducer;
