import { configureStore } from "@reduxjs/toolkit";

import dashboardReducer from "./slices/dashboardSlice";
import partyReducer from "./slices/partySlice";
import transactionReducer from "./slices/transactionSlice";
import attendanceReducer from "./slices/attendanceSlice";
import taskReducer from "./slices/taskSlice";
import materialReducer from "./slices/materialSlice";
import uiReducer from "./slices/uiSlice";
import projectReducer from "./slices/projectSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    dashboard: dashboardReducer,
    parties: partyReducer,
    projects: projectReducer,
    transactions: transactionReducer,
    attendance: attendanceReducer,
    tasks: taskReducer,
    materials: materialReducer,
  },
});