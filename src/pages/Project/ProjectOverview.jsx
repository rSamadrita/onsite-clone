import "./ProjectOverview.css";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  MdLocationOn,
  MdCalendarToday,
  MdCurrencyRupee,
  MdPeople,
  MdAssignment,
  MdInventory,
} from "react-icons/md";
import ProgressChart from "../../components/ProjectOverview/ProgressChart";
import BudgetOverview from "../../components/ProjectOverview/BudgetOverview";
import Timeline from "../../components/ProjectOverview/Timeline";

import { FaArrowTrendUp } from "react-icons/fa6";

const ProjectOverview = () => {
  const { id } = useParams();

  const project = useSelector((state) =>
    state.projects.projects.find((p) => String(p.id) === id),
  );

  if (!project) {
    return <div className="project-not-found">Project not found.</div>;
  }

  return (
    <div className="project-overview">
      {/* HEADER */}

      <div className="overview-header">
        <div>
          <span className="status-pill">Active Project</span>

          <h1>{project.name}</h1>

          <p>
            <MdLocationOn />
            {project.address}
          </p>
        </div>
      </div>

      {/* PROJECT INFO */}

      <div className="overview-info-grid">
        <div className="info-card">
          <MdCalendarToday />

          <div>
            <span>Timeline</span>

            <h3>
              {new Date(project.startDate).toLocaleDateString()}

              {" - "}

              {new Date(project.endDate).toLocaleDateString()}
            </h3>
          </div>
        </div>

        <div className="info-card">
          <MdCurrencyRupee />

          <div>
            <span>Budget</span>

            <h3>
              {project.value
                ? `₹ ${Number(project.value).toLocaleString("en-IN")}`
                : "Not Added"}
            </h3>
          </div>
        </div>

        <div className="info-card">
          <MdPeople />

          <div>
            <span>Total Staff</span>

            <h3>0</h3>
          </div>
        </div>

        <div className="info-card">
          <MdAssignment />

          <div>
            <span>Tasks</span>

            <h3>0</h3>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}

      <div className="quick-actions">
        <h2>Quick Actions</h2>

        <div className="quick-grid">
          <button>Add Staff</button>

          <button>Add Task</button>

          <button>Payment In</button>

          <button>Payment Out</button>

          <button>Add Material</button>

          <button>Create MOM</button>
        </div>
      </div>

      {/* STATS */}

      <div className="stats-grid">
        <div className="stat-card">
          <FaArrowTrendUp />

          <h2>Project Progress</h2>

          <h1>0%</h1>
        </div>

        <div className="stat-card">
          <MdInventory />

          <h2>Inventory Items</h2>

          <h1>0</h1>
        </div>

        <div className="stat-card">
          <MdAssignment />

          <h2>Pending Tasks</h2>

          <h1>0</h1>
        </div>
      </div>

<div className="overview-two-column">

  <ProgressChart />

  <BudgetOverview />

</div>

<Timeline />
      {/* RECENT ACTIVITY */}

      <div className="recent-card">
        <h2>Recent Activity</h2>

        <p>No activity available yet.</p>
      </div>
    </div>
  );
};

export default ProjectOverview;
