import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  // keyed by projectId: array of material items
  byProject: {},
};

const materialSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    addMaterial(state, action) {
      const { projectId, ...data } = action.payload;
      if (!state.byProject[projectId]) state.byProject[projectId] = [];
      state.byProject[projectId].push({
        id: uuid(),
        createdAt: new Date().toISOString(),
        inStock: 0,
        ...data,
      });
    },
    updateStock(state, action) {
      const { projectId, materialId, delta } = action.payload;
      const list = state.byProject[projectId];
      if (!list) return;
      const item = list.find((m) => m.id === materialId);
      if (item) {
        item.inStock = Math.max(0, (item.inStock || 0) + delta);
      }
    },
    deleteMaterial(state, action) {
      const { projectId, materialId } = action.payload;
      if (state.byProject[projectId]) {
        state.byProject[projectId] = state.byProject[projectId].filter(
          (m) => m.id !== materialId
        );
      }
    },
  },
});

export const { addMaterial, updateStock, deleteMaterial } = materialSlice.actions;
export default materialSlice.reducer;
