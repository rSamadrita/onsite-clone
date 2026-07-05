import "./Layout.css";

import { useSelector, useDispatch } from "react-redux";
import { closeSidebar } from "../../redux/slices/uiSlice";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  return (
    <div className="layout">
      <Sidebar />

      {sidebarOpen && (
        <div className="overlay" onClick={() => dispatch(closeSidebar())} />
      )}

      <div className="main-content">
        <Header />

        <div className="page">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
