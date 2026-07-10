import "./PartyDashboard.scss";

import { useSelector } from "react-redux";

import { useState } from "react";

import PartyTable from "./PartyTable";

import CreatePartyModal from "../../../components/Parties/CreatePartyModal";

const PartyDashboard=()=>{

const parties=useSelector(
state=>state.parties.parties
);

const [showModal,setShowModal]=
useState(false);

return(

<div className="party-dashboard">

<div className="party-header">

<div>

<h1>Parties</h1>

<p>

Manage Clients, Staff,
Contractors & Vendors

</p>

</div>

<button
onClick={()=>setShowModal(true)}
>

+ Add Party

</button>

</div>

<PartyTable
parties={parties}
/>

{

showModal&&

<CreatePartyModal

onClose={()=>setShowModal(false)}

/>

}

</div>

);

};

export default PartyDashboard;