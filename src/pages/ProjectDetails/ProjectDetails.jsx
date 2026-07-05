// import "./ProjectDetails.css";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  MdLocationOn,
  MdCalendarToday,
  MdCurrencyRupee,
  MdGroups,
  MdAssignment,
  MdInventory,
  MdPayments,
  MdFactCheck,
  MdArrowBack,
} from "react-icons/md";

import { useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const project = useSelector((state) =>
    state.projects.projects.find((p) => p.id === id),
  );

  if (!project) {
    return (
      <div className="not-found">
        <h2>Project Not Found</h2>

        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="project-details">
      <button className="back-btn" onClick={() => navigate("/")}>
        <MdArrowBack />
        Back
      </button>

      <div className="project-banner">
        <div>
          <h1>🏗 {project.name}</h1>

          <p>
            <MdLocationOn />

            {project.address}
          </p>
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <MdCalendarToday />

          <h3>Start Date</h3>

          <p>{new Date(project.startDate).toLocaleDateString()}</p>
        </div>

        <div className="summary-card">
          <MdCalendarToday />

          <h3>End Date</h3>

          <p>{new Date(project.endDate).toLocaleDateString()}</p>
        </div>

        <div className="summary-card">
          <MdCurrencyRupee />

          <h3>Project Value</h3>

          <p>
            {project.value
              ? Number(project.value).toLocaleString("en-IN")
              : "Not Added"}
          </p>
        </div>
      </div>

      <h2 className="module-title">Project Modules</h2>

      <div className="module-grid">
        <div className="module-card">
          <MdGroups />

          <h3>Party</h3>

          <p>Clients, Workers & Suppliers</p>
        </div>

        <div className="module-card">
          <MdAssignment />

          <h3>Tasks</h3>

          <p>Project Task Management</p>
        </div>

        <div className="module-card">
          <MdFactCheck />

          <h3>Attendance</h3>

          <p>Daily Attendance</p>
        </div>

        <div className="module-card">
          <MdInventory />

          <h3>Materials</h3>

          <p>Inventory & Stock</p>
        </div>

        <div className="module-card">
          <MdPayments />

          <h3>Transactions</h3>

          <p>Payments & Expenses</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
