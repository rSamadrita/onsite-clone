import "./Sidebar.css";

import { NavLink } from "react-router-dom";

import {
  MdDashboard,
  MdPeople,
  MdTask,
  MdInventory,
  MdPayment,
  MdFactCheck,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { closeSidebar } from "../../redux/slices/uiSlice";

const Sidebar = () => {
    const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
    const dispatch = useDispatch();

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="logo">OnSite</div>

      <nav>
        <NavLink to="/" onClick={() => dispatch(closeSidebar())}>
          <MdDashboard />
          Dashboard
        </NavLink>

        <NavLink to="/party" onClick={() => dispatch(closeSidebar())}>
          <MdPeople />
          Party
        </NavLink>

        <NavLink to="/transactions" onClick={() => dispatch(closeSidebar())}>
          <MdPayment />
          Transactions
        </NavLink>

        <NavLink to="/tasks" onClick={() => dispatch(closeSidebar())}>
          <MdTask />
          Tasks
        </NavLink>

        <NavLink to="/attendance" onClick={() => dispatch(closeSidebar())}>
          <MdFactCheck />
          Attendance
        </NavLink>

        <NavLink to="/materials" onClick={() => dispatch(closeSidebar())}>
          <MdInventory />
          Materials
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
