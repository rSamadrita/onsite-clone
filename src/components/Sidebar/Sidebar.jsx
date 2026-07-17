import "./Sidebar.css";

import { NavLink, useNavigate } from "react-router-dom";

import {
  MdDashboard,
  MdPeople,
  MdTask,
  MdInventory,
  MdPayment,
  MdFactCheck,
  MdFolder,
  MdAssessment,
  MdSettings,
  MdHelpOutline,
  MdKeyboardArrowDown,
  MdLogout,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { closeSidebar } from "../../redux/slices/uiSlice";
import { logout } from "../../redux/slices/authSlice";
import logo from "../../assets/logo.png";

const Sidebar = () => {
    const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeSidebar());
    navigate("/login");
  };

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      {/* Logo Section */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={logo} alt="Onsite Teams" />
          <div className="logo-text">
            <h3>Onsite Teams</h3>
            <span>Construction ERP</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <NavLink to="/" onClick={() => dispatch(closeSidebar())} end>
          <MdDashboard />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/roles-access" onClick={() => dispatch(closeSidebar())}>
          <MdPeople />
          <span>Roles and Access</span>
        </NavLink>

        <NavLink to="/business-card" onClick={() => dispatch(closeSidebar())}>
          <MdFactCheck />
          <span>Business Card</span>
        </NavLink>

        <NavLink to="/invite-friends" onClick={() => dispatch(closeSidebar())}>
          <MdInventory />
          <span>Invite Friends</span>
        </NavLink>

        <NavLink to="/give-feedback" onClick={() => dispatch(closeSidebar())}>
          <MdTask />
          <span>Give Feedback</span>
        </NavLink>

        <NavLink to="/reports" onClick={() => dispatch(closeSidebar())}>
          <MdAssessment />
          <span>Reports</span>
        </NavLink>

      </nav>

      {/* Bottom Section */}
      <div className="sidebar-bottom">
        {/* Help Section */}
        <div className="sidebar-help">
          <div className="help-icon">
            <MdHelpOutline color="#0e2368" />
          </div>
          <div className="help-content">
            <h4>Need Help?</h4>
            <p>Visit our help center or contact support.</p>
          </div>
        </div>
        <button className="help-button">
          Contact Support
        </button>

        {/* User Profile */}
        <div className="sidebar-profile" onClick={handleLogout}>
          <div className="profile-avatar">
            <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=0e2368&color=fff`} alt="User" />
          </div>
          <div className="profile-info">
            <h4>{user?.name || 'User'}</h4>
            <p>{user?.role || 'Admin'}</p>
          </div>
          <MdLogout className="profile-arrow" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
