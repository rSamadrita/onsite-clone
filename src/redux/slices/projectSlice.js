import { createSlice } from "@reduxjs/toolkit";
import { loadProjects } from "../../utils/storage";
import { v4 as uuid } from "uuid";

// Fallback: if the new unified state isn't in localStorage yet (first run after
// upgrade), seed from the legacy key so no data is lost.
const initialState = {
  currentProject: null,
  projects: loadProjects(),
};

const projectSlice = createSlice({
  name: "projects",

  initialState,

  reducers: {
    addProject(state, action) {
      const project = {
        id: uuid(),
        name: action.payload.name,
        address: action.payload.address,
        latitude: action.payload.latitude || null,
        longitude: action.payload.longitude || null,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        value: action.payload.value || "",
        createdAt: new Date().toISOString(),
      };

      state.projects.unshift(project);
    },

    deleteProject(state, action) {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },

    updateProject(state, action) {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );

      if (index !== -1) {
        state.projects[index] = {
          ...state.projects[index],
          ...action.payload,
        };
      }
    },

    selectProject(state, action) {
      state.currentProject = action.payload;
    },

    clearCurrentProject(state) {
      state.currentProject = null;
    },
  },
});

export const {
  addProject,
  deleteProject,
  updateProject,
  selectProject,
  clearCurrentProject,
} = projectSlice.actions;

export default projectSlice.reducer;