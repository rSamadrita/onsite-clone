import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  // byProject[projectId] = { staff: [], records: {} }
  // records[YYYY-MM-DD][staffId] = { status: 'present'|'absent'|null }
  byProject: {},
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    addStaff(state, action) {
      const { projectId, ...data } = action.payload;
      if (!state.byProject[projectId]) {
        state.byProject[projectId] = { staff: [], records: {} };
      }
      state.byProject[projectId].staff.push({
        id: uuid(),
        ...data,
      });
    },
    markAttendance(state, action) {
      const { projectId, date, staffId, status } = action.payload;
      if (!state.byProject[projectId]) return;
      if (!state.byProject[projectId].records[date]) {
        state.byProject[projectId].records[date] = {};
      }
      state.byProject[projectId].records[date][staffId] = status;
    },
  },
});

export const { addStaff, markAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
