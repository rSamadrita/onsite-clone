import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  // keyed by projectId
  byProject: {},
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      const { projectId, ...data } = action.payload;
      if (!state.byProject[projectId]) state.byProject[projectId] = [];
      state.byProject[projectId].push({
        id: uuid(),
        status: "not_started",
        createdAt: new Date().toISOString(),
        ...data,
      });
    },
    updateTaskStatus(state, action) {
      const { projectId, taskId, status } = action.payload;
      const list = state.byProject[projectId];
      if (!list) return;
      const task = list.find((t) => t.id === taskId);
      if (task) task.status = status;
    },
    deleteTask(state, action) {
      const { projectId, taskId } = action.payload;
      if (state.byProject[projectId]) {
        state.byProject[projectId] = state.byProject[projectId].filter(
          (t) => t.id !== taskId
        );
      }
    },
  },
});

export const { addTask, updateTaskStatus, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
