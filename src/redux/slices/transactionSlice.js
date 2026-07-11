import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  // keyed by projectId
  byProject: {},
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction(state, action) {
      const { projectId, ...data } = action.payload;
      if (!state.byProject[projectId]) state.byProject[projectId] = [];
      state.byProject[projectId].unshift({
        id: uuid(),
        createdAt: new Date().toISOString(),
        ...data,
      });
    },
    deleteTransaction(state, action) {
      const { projectId, id } = action.payload;
      if (state.byProject[projectId]) {
        state.byProject[projectId] = state.byProject[projectId].filter(
          (t) => t.id !== id
        );
      }
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
