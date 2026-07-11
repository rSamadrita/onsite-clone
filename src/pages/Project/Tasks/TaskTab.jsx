import "./TaskTab.css";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, updateTaskStatus } from "../../../redux/slices/taskSlice";

const AddTaskSheet = ({ onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [member, setMember] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <div className="task-overlay" onClick={onClose}>
      <div className="task-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <p className="sheet-title">Add New Task</p>
        <div className="task-form">
          <label>Task Title *</label>
          <input
            placeholder="e.g. Lay foundation"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Assigned Member</label>
          <input
            placeholder="Member name"
            value={member}
            onChange={(e) => setMember(e.target.value)}
          />
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button
            className="task-save-btn"
            onClick={() => {
              if (!title.trim()) { alert("Task title is required."); return; }
              onSave({ title: title.trim(), member, dueDate });
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const STATUS_LABELS = {
  not_started: "NOT STARTED",
  ongoing: "ONGOING",
  completed: "COMPLETED",
};

const TaskTab = ({ projectId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(
    (state) => state.tasks.byProject[projectId] || []
  );

  const [addOpen, setAddOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("schedule");

  const notStarted = tasks.filter((t) => t.status === "not_started").length;
  const ongoing = tasks.filter((t) => t.status === "ongoing").length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  const filtered = tasks.filter((t) => {
    if (statusFilter === "all") return true;
    return t.status === statusFilter;
  });

  const handleAddTask = (data) => {
    dispatch(addTask({ projectId, ...data }));
    setAddOpen(false);
  };

  const cycleStatus = (task) => {
    const next = {
      not_started: "ongoing",
      ongoing: "completed",
      completed: "not_started",
    };
    dispatch(updateTaskStatus({ projectId, taskId: task.id, status: next[task.status] }));
  };

  const statusColor = {
    not_started: { bg: "#f1f5f9", text: "#64748b" },
    ongoing:     { bg: "#ede7f6", text: "#5c35c9" },
    completed:   { bg: "#dcfce7", text: "#16a34a" },
  };

  return (
    <div className="task-tab">
      {/* Stats bar */}
      <div className="task-stats-bar">
        <div className="task-stat">
          <span className="task-stat-label">NOT STARTED</span>
          <span className="task-stat-val">{notStarted}</span>
        </div>
        <div className="task-stat-divider" />
        <div className="task-stat">
          <span className="task-stat-label">ONGOING</span>
          <span className="task-stat-val">{ongoing}</span>
        </div>
        <div className="task-stat-divider" />
        <div className="task-stat">
          <span className="task-stat-label">PROGRESS</span>
          <span className="task-stat-val">{progress} %</span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="task-filter-bar">
        <button className="task-filter-icon">🔍</button>

        <div className="task-filter-select">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Status</option>
            <option value="not_started">Not Started</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="task-filter-select">
          <select disabled>
            <option>Member</option>
          </select>
        </div>

        <button
          className="task-sort-btn"
          onClick={() =>
            setSortBy(sortBy === "schedule" ? "status" : "schedule")
          }
        >
          ↕ As Schedule
        </button>
      </div>

      {/* Task list or empty state */}
      {filtered.length === 0 ? (
        <div className="task-empty">
          <div className="task-empty-icon">📈</div>
          <h3>No task added.</h3>
          <p>All task will be listed here</p>
        </div>
      ) : (
        <div className="task-list">
          {filtered.map((t) => {
            const sc = statusColor[t.status];
            return (
              <div className="task-card" key={t.id}>
                <div className="task-card-left">
                  <span
                    className="task-status-badge"
                    style={{ background: sc.bg, color: sc.text }}
                  >
                    {STATUS_LABELS[t.status]}
                  </span>
                  <p className="task-title">{t.title}</p>
                  {t.member && (
                    <p className="task-member">👤 {t.member}</p>
                  )}
                  {t.dueDate && (
                    <p className="task-due">📅 {t.dueDate}</p>
                  )}
                </div>
                <button
                  className="task-cycle-btn"
                  onClick={() => cycleStatus(t)}
                  title="Cycle status"
                >
                  ›
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Task button (bottom fixed) */}
      <div className="task-add-bar">
        <button className="task-add-btn" onClick={() => setAddOpen(true)}>
          + Add New Task
        </button>
      </div>

      {addOpen && (
        <AddTaskSheet
          onSave={handleAddTask}
          onClose={() => setAddOpen(false)}
        />
      )}
    </div>
  );
};

export default TaskTab;
