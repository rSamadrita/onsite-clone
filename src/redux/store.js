import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "../utils/storage";

import dashboardReducer   from "./slices/dashboardSlice";
import partyReducer       from "./slices/partySlice";
import transactionReducer from "./slices/transactionSlice";
import attendanceReducer  from "./slices/attendanceSlice";
import taskReducer        from "./slices/taskSlice";
import materialReducer    from "./slices/materialSlice";
import uiReducer          from "./slices/uiSlice";
import projectReducer     from "./slices/projectSlice";

// Load previously-saved slices from localStorage as the initial Redux state
const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    ui:           uiReducer,
    dashboard:    dashboardReducer,
    parties:      partyReducer,
    projects:     projectReducer,
    transactions: transactionReducer,
    attendance:   attendanceReducer,
    tasks:        taskReducer,
    materials:    materialReducer,
  },
  preloadedState,
});

// ─── Persist to localStorage on every state change ───────────────────────────
// Debounce writes so rapid dispatches don't hammer localStorage
let saveTimer = null;

store.subscribe(() => {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveState(store.getState());
  }, 300);
});
