import "./BottomNav.css";

import { NavLink } from "react-router-dom";

import {

MdDashboard,

MdPeople,

MdTask,

MdInventory,

MdPayment

} from "react-icons/md";

const BottomNav=()=>{

return(

<div className="bottom-nav mobile-only">

<NavLink to="/">

<MdDashboard/>

</NavLink>

<NavLink to="/party">

<MdPeople/>

</NavLink>

<NavLink to="/transactions">

<MdPayment/>

</NavLink>

<NavLink to="/tasks">

<MdTask/>

</NavLink>

<NavLink to="/materials">

<MdInventory/>

</NavLink>

</div>

)

}

export default BottomNav;