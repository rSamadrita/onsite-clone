import "./Dashboard.css";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteProject } from "../../redux/slices/projectSlice";

import CreateProjectModal from "../../components/CreateProjectModal/CreateProjectModal";
import DeleteProjectModal from "../../components/DeleteProjectModal/DeleteProjectModal";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const Dashboard = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects.projects);

  const [showModal, setShowModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  return (
    <>
      {/* Header */}

      <div className="dashboard-header">
        <div >
          <h1>Dashboard</h1>

          <p>Manage all your construction projects</p>
        </div>

        <button
          className="create-project-btn"
          onClick={() => setShowModal(true)}
        >
          + Create New Project
        </button>
      </div>

      {/* Empty State */}

      {projects.length === 0 ? (
        <div className="empty-project">
          <h2>No Projects Yet</h2>

          <p>Click on Create New Project to get started.</p>
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

      {/* Create Project Modal */}

      {showModal && <CreateProjectModal onClose={() => setShowModal(false)} />}

      {/* Delete Modal */}

      {deleteId && (
        <DeleteProjectModal
          onCancel={() => setDeleteId(null)}
          onDelete={() => {
            dispatch(deleteProject(deleteId));

            setDeleteId(null);
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
