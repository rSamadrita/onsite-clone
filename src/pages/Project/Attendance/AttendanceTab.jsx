import "./AttendanceTab.css";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addStaff, markAttendance } from "../../../redux/slices/attendanceSlice";

const SUB_TABS = ["All", "Site Staff", "Labour Contractor"];

const toDateKey = (d) => d.toISOString().slice(0, 10);

const fmt = (d) => {
  const day = String(d.getDate()).padStart(2, "0");
  const mon = d.toLocaleString("en-US", { month: "short" });
  return { day, mon };
};

const AddStaffSheet = ({ onSave, onClose }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Mason");
  const [category, setCategory] = useState("Site Staff");

  return (
    <div className="att-overlay" onClick={onClose}>
      <div className="att-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <p className="sheet-title">Add Site Staff</p>
        <div className="att-form">
          <label>Name *</label>
          <input
            placeholder="Staff name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {["Mason", "Helper", "Carpenter", "Electrician", "Plumber", "Supervisor"].map(
              (r) => <option key={r}>{r}</option>
            )}
          </select>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {["Site Staff", "Labour Contractor"].map((c) => <option key={c}>{c}</option>)}
          </select>
          <button
            className="att-save-btn"
            onClick={() => {
              if (!name.trim()) { alert("Name is required."); return; }
              onSave({ name: name.trim(), role, category });
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const AttendanceTab = ({ projectId }) => {
  const dispatch = useDispatch();
  const projectData = useSelector(
    (state) => state.attendance.byProject[projectId] || { staff: [], records: {} }
  );
  const { staff, records } = projectData;

  const [activeSubTab, setActiveSubTab] = useState("All");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [addStaffOpen, setAddStaffOpen] = useState(false);

  const dateKey = toDateKey(currentDate);
  const { day, mon } = fmt(currentDate);

  const dayRecords = records[dateKey] || {};

  const prevDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };

  const nextDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };

  const mark = (staffId, status) => {
    dispatch(markAttendance({ projectId, date: dateKey, staffId, status }));
  };

  const filteredStaff = staff.filter((s) => {
    if (activeSubTab === "All") return true;
    return s.category === activeSubTab;
  });

  const presentCount = filteredStaff.filter(
    (s) => dayRecords[s.id] === "present"
  ).length;

  const absentCount = filteredStaff.filter(
    (s) => dayRecords[s.id] === "absent"
  ).length;

  const handleAddStaff = (data) => {
    dispatch(addStaff({ projectId, ...data }));
    setAddStaffOpen(false);
  };

  return (
    <div className="attendance-tab">
      {/* Sub-tabs */}
      <div className="att-subtabs">
        {SUB_TABS.map((t) => (
          <button
            key={t}
            className={`att-subtab-btn ${activeSubTab === t ? "active" : ""}`}
            onClick={() => setActiveSubTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Date navigation + summary */}
      <div className="att-date-row">
        <div className="att-date-nav">
          <button className="att-nav-arrow" onClick={prevDay}>‹</button>
          <div className="att-date-box">
            <span className="att-date-day">{day}</span>
            <span className="att-date-mon">{mon}</span>
          </div>
          <button className="att-nav-arrow" onClick={nextDay}>›</button>
        </div>

        <div className="att-summary">
          <span className="att-present-count">{presentCount} Present</span>
          <div className="att-legend">
            <span className="att-legend-dot grey" />
            <span>{absentCount} Absent</span>
            <span className="att-legend-dot purple" />
            <span>0/0 PL/WO</span>
          </div>
        </div>
      </div>

      {/* Staff list header */}
      <div className="att-section-header">
        <span>
          Active ({filteredStaff.length}){" "}
          <span className="att-chevron">⌄</span>
        </span>
        <button
          className="att-add-staff-btn"
          onClick={() => setAddStaffOpen(true)}
        >
          + Add Site Staff
        </button>
      </div>

      {/* Staff rows */}
      {filteredStaff.length === 0 ? (
        <div className="att-empty">
          <p>No payroll added</p>
        </div>
      ) : (
        <div className="att-staff-list">
          {filteredStaff.map((s) => {
            const status = dayRecords[s.id] || null;
            return (
              <div className="att-staff-card" key={s.id}>
                <div className="att-staff-top">
                  <div className="att-avatar">
                    {s.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="att-staff-name">{s.name}</span>
                  <span className="att-arrow">›</span>
                </div>
                <div className="att-staff-row">
                  <span className="att-role-label">{s.role}</span>
                  <div className="att-btn-group">
                    <button
                      className={`att-mark-btn present ${status === "present" ? "active-present" : ""}`}
                      onClick={() => mark(s.id, "present")}
                    >
                      Present
                    </button>
                    <button
                      className={`att-mark-btn absent ${status === "absent" ? "active-absent" : ""}`}
                      onClick={() => mark(s.id, "absent")}
                    >
                      Absent
                    </button>
                    <button className="att-more-btn">⌄</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {addStaffOpen && (
        <AddStaffSheet
          onSave={handleAddStaff}
          onClose={() => setAddStaffOpen(false)}
        />
      )}
    </div>
  );
};

export default AttendanceTab;
