import "./PartyDetails.scss";

const PartyDetails = () => (
  <section className="party-details">
    <header className="party-details__header">
      <h1>Party Details</h1>
      <p>Review party information and activity for the selected project.</p>
    </header>

    <div className="party-details__grid">
      <div className="party-details__panel">
        <h2>Contact Info</h2>
        <p>Example Name</p>
        <p>example@company.com</p>
        <p>+91 98765 43210</p>
      </div>

      <div className="party-details__panel">
        <h2>Party Role</h2>
        <p>Primary contractor</p>
        <p>Status: Active</p>
      </div>
    </div>
  </section>
);

export default PartyDetails;
