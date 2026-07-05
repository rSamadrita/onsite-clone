import "./HeroBanner.css";

import { HiPlus } from "react-icons/hi";

const HeroBanner = ({ onCreate }) => {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <div className="hero-banner">

      <div className="hero-left">

        <span className="hero-tag">
          Construction ERP
        </span>

        <h1 style={{ fontSize: "2.5rem", lineHeight: "1.2" , color: "#e4e9f9", fontWeight: "600"}}>
          {/* {greeting},
          <br /> */}
          Building Project
Management Software
        </h1>

        <p style={{ fontSize: "1.1rem", lineHeight: "1.5", color: "white"}}>
          Manage your projects, parties, attendance,
          materials and financial records from one place.
        </p>

      </div>

      <div className="hero-right">

        <button
          className="hero-btn"
          onClick={onCreate}
        >
          <HiPlus />

          Create Project

        </button>

      </div>

    </div>
  );
};

export default HeroBanner;