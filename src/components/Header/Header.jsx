import "./Header.css";
import { HiOutlineMenu } from "react-icons/hi";

import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/slices/uiSlice";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="header">

      <div className="left">

        <HiOutlineMenu
          className="menu"
          onClick={() => dispatch(toggleSidebar())}
        />

        <h2 className="header-title">
          OnSite Clone
        </h2>

      </div>

    </header>
  );
};

export default Header;