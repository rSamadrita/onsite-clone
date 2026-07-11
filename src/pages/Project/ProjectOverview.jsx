import "./ProjectOverview.css";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdArrowBack, MdThumbUp, MdNotifications, MdPictureAsPdf, MdMoreVert } from "react-icons/md";

import PartyTab        from "./Parties/PartyTab";
import TransactionTab  from "./Transactions/TransactionTab";
import MaterialTab     from "./Materials/MaterialTab";
import AttendanceTab   from "./Attendance/AttendanceTab";
import TaskTab         from "./Tasks/TaskTab";

const TABS = [
  "Party",
  "Transaction",
  "Site",
  "Task",
  "Attendance",
  "Inventory",
  "MOM",
  "Design",
];

const PlaceholderTab = ({ name }) => (
  <div className="po-placeholder">
    <p>{name} — coming soon</p>
  </div>
);

const ProjectOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = useSelector((state) =>
    state.projects.projects.find((p) => String(p.id) === id)
  );

  const [activeTab, setActiveTab] = useState("Party");

  if (!project) {
    return (
      <div className="po-not-found">
        <button onClick={() => navigate("/")}>← Back</button>
        <p>Project not found.</p>
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case "Party":        return <PartyTab       projectId={id} />;
      case "Transaction":  return <TransactionTab projectId={id} />;
      case "Material":     return <MaterialTab    projectId={id} />;
      case "Attendance":   return <AttendanceTab  projectId={id} />;
      case "Task":         return <TaskTab        projectId={id} />;
      default:             return <PlaceholderTab name={activeTab} />;
    }
  };

  return (
    <div className="po-root">
      {/* ── Top header bar ── */}
      <div className="po-topbar">
        <button
          className="po-back-btn"
          onClick={() => navigate("/")}
          aria-label="Go back"
        >
          <MdArrowBack />
        </button>

        <span className="po-project-name">{project.name}</span>

        <div className="po-topbar-actions">
          <button className="po-icon-btn" aria-label="Like"><MdThumbUp /></button>
          <button className="po-icon-btn" aria-label="Notifications"><MdNotifications /></button>
          <button className="po-icon-btn" aria-label="PDF"><MdPictureAsPdf /></button>
          <button className="po-icon-btn" aria-label="More"><MdMoreVert /></button>
        </div>
      </div>

      {/* ── Horizontal scrollable tab bar ── */}
      <div className="po-tabbar" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`po-tab ${activeTab === tab ? "po-tab--active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className="po-tab-content">
        {renderTab()}
      </div>
    </div>
  );
};

export default ProjectOverview;
