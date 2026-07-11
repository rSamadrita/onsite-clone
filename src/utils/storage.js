// ─── Legacy key (projects only) ─────────────────────────────────────────────
const PROJECTS_KEY = "onsite_projects";

export const loadProjects = () => {
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveProjects = (projects) => {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error("Error saving projects:", e);
  }
};

// ─── Full-state persistence ──────────────────────────────────────────────────
const STATE_KEY = "onsite_app_state";

/**
 * Slices to persist. "ui" is intentionally excluded (sidebar open/close state
 * shouldn't survive a refresh). "dashboard" is a stub so skip it too.
 */
const PERSISTED_SLICES = [
  "parties",
  "projects",
  "transactions",
  "attendance",
  "tasks",
  "materials",
];

export const loadState = () => {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return undefined; // let Redux use its own initialState
    const saved = JSON.parse(raw);

    // Only restore the slices we care about
    const partial = {};
    PERSISTED_SLICES.forEach((key) => {
      if (saved[key] !== undefined) partial[key] = saved[key];
    });
    return partial;
  } catch {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const partial = {};
    PERSISTED_SLICES.forEach((key) => {
      if (state[key] !== undefined) partial[key] = state[key];
    });
    localStorage.setItem(STATE_KEY, JSON.stringify(partial));
  } catch (e) {
    console.error("Error saving state:", e);
  }
};