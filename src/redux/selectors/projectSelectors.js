export const getProjects = (state) => state.projects.projects;

export const getCurrentProject = (state) =>
  state.projects.currentProject;

export const getProjectById = (id) => (state) =>
  state.projects.projects.find((project) => project.id === id);

export const getProjectCount = (state) =>
  state.projects.projects.length;