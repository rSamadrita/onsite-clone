import "./ProjectCard.css";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { HiDotsVertical } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi2";

import {
  MdLocationOn,
  MdCalendarToday,
} from "react-icons/md";

const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleNavigate = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div
      className="project-card"
    >
      {/* Header */}

      <div className="card-header">

        <div className="card-left">

          <div className="status-badge">
            Active
          </div>

          <h2>{project.name}</h2>

          <div className="address">
            <MdLocationOn color="white"/>
            <p className="project-address">
              {project.address}
            </p>
          </div>

        </div>

        {/* Menu */}

        <div
          className="menu-wrapper"
          ref={menuRef}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="kebab"
            onClick={() => setShowMenu(!showMenu)}
          >
            <HiDotsVertical />
          </button>

          {showMenu && (
            <div className="popup-menu">
              <button
                onClick={() => {
                  setShowMenu(false);
                  onDelete(project.id);
                }}
              >
                🗑 Delete Project
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Body */}

      <div className="info-grid">

        <div className="info-item">

          <MdCalendarToday />

          <div style={{color: "white"}}>

            <small>Timeline</small>

            <strong className="timeline-text">
              {new Date(project.startDate).toLocaleDateString()} -{" "}
              {new Date(project.endDate).toLocaleDateString()}
            </strong>

          </div>

        </div>


          <div style={{color: "white"}}>

            <small>Project Value</small>

            <strong className="project-value">
              {project.value
                ? `₹ ${Number(project.value).toLocaleString("en-IN")}`
                : "Not Added"}
            </strong>

          </div>

<HiArrowRight
            className="arrow-icon"
            onClick={handleNavigate}
          />


      </div>

    </div>
  );
};

export default ProjectCard;