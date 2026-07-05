import "./Dashboard.css";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  MdFolder,
  MdCurrencyRupee,
  MdPeople,
  MdChecklist,
  MdBusiness,
  MdInventory,
  MdPayments,
} from "react-icons/md";

import HeroBanner from "../../components/HeroBanner/HeroBanner";
import StatsCard from "../../components/StatsCard/StatsCard";
import QuickActionCard from "../../components/QuickActionCard/QuickActionCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

import CreateProjectModal from "../../components/CreateProjectModal/CreateProjectModal";
import DeleteProjectModal from "../../components/DeleteProjectModal/DeleteProjectModal";

import { deleteProject } from "../../redux/slices/projectSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects.projects);

  const [showModal, setShowModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const totalProjectValue = useMemo(() => {
    return projects.reduce(
      (sum, project) => sum + Number(project.value || 0),
      0,
    );
  }, [projects]);

  const activeProjects = useMemo(() => {
    return projects.length;
  }, [projects]);

  const pendingTasks = 0;

  const workersToday = 0;

  return (
    <div className="dashboard-container">
      <div className="dashboard-page">
        {/* =========================
            HERO
      ========================== */}
      <h2 style={{color: "#03163f"}}>Dashboard</h2>
        <HeroBanner onCreate={() => setShowModal(true)} />

        {/* =========================
            KPI CARDS
      ========================== */}

        <div className="stats-grid">
          <StatsCard
            title="Projects"
            value={projects.length}
            color="#510400"
            icon={<MdFolder />}
          />

          <StatsCard
            title="Project Value"
            value={`₹ ${totalProjectValue.toLocaleString("en-IN")}`}
            color="#2F80ED"
            icon={<MdCurrencyRupee />}
          />

          <StatsCard
            title="Workers Today"
            value={workersToday}
            color="#27AE60"
            icon={<MdPeople />}
          />

          <StatsCard
            title="Pending Tasks"
            value={pendingTasks}
            color="#F2994A"
            icon={<MdChecklist />}
          />
        </div>

        {/* =========================
        QUICK ACTIONS + ACTIVITY
      ========================== */}

        <div className="dashboard-middle">
          {/* LEFT */}

          <section className="quick-actions">
            <div className="section-heading">
              <h2>Quick Actions</h2>

              <p>Jump to frequently used modules</p>
            </div>

            <div className="quick-grid">
              <QuickActionCard
                title="Party"
                subtitle="Clients & Vendors"
                color="#510400"
                icon={<MdBusiness />}
              />

              <QuickActionCard
                title="Attendance"
                subtitle="Daily Workforce"
                color="#27AE60"
                icon={<MdPeople />}
              />

              <QuickActionCard
                title="Materials"
                subtitle="Stock Register"
                color="#2F80ED"
                icon={<MdInventory />}
              />

              <QuickActionCard
                title="Tasks"
                subtitle="Site Activities"
                color="#F2994A"
                icon={<MdChecklist />}
              />

              <QuickActionCard
                title="Transactions"
                subtitle="Income & Expenses"
                color="#9B51E0"
                icon={<MdPayments />}
              />
            </div>
          </section>

          {/* RIGHT */}

          <aside className="activity-panel">
            <div className="section-heading">
              <h2>Recent Activity</h2>

              <p>Latest updates</p>
            </div>

            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-dot green" />

                <div>
                  <h4>No project updates</h4>

                  <p>Create a project to start tracking progress.</p>
                </div>
              </div>

              <div className="activity-item">
                <span className="activity-dot blue" />

                <div>
                  <h4>No attendance today</h4>

                  <p>Daily attendance will appear here.</p>
                </div>
              </div>

              <div className="activity-item">
                <span className="activity-dot orange" />

                <div>
                  <h4>No pending tasks</h4>

                  <p>Upcoming activities will be listed here.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* =========================
          RECENT PROJECTS
      ========================== */}

        <div className="projects-section">
          <div className="section-heading">
            <div>
              <h2>Recent Projects</h2>

              <p>{activeProjects} Active Projects</p>
            </div>
          </div>
          {projects.length === 0 ? (
            <div className="empty-project">
              <div className="empty-icon">🏗️</div>

              <h2>No Projects Yet</h2>

              <p>
                Start by creating your first construction project. Once created,
                all your projects will appear here.
              </p>

              <button
                className="create-project-btn"
                onClick={() => setShowModal(true)}
              >
                + Create New Project
              </button>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={(id) => setDeleteId(id)}
                />
              ))}
            </div>
          )}

          {/* =========================
            CREATE PROJECT MODAL
      ========================== */}

          {showModal && (
            <CreateProjectModal onClose={() => setShowModal(false)} />
          )}

          {/* =========================
            DELETE PROJECT MODAL
      ========================== */}

          {deleteId && (
            <DeleteProjectModal
              onCancel={() => setDeleteId(null)}
              onDelete={() => {
                dispatch(deleteProject(deleteId));

                setDeleteId(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
