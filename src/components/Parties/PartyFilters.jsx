import "./PartyFilters.scss";

const PartyFilters = () => (
  <section className="party-filters">
    <div className="party-filters__row">
      <label>
        Search
        <input type="text" placeholder="Search parties..." />
      </label>
      <label>
        Status
        <select>
          <option>All</option>
          <option>Active</option>
          <option>Confirmed</option>
          <option>Pending</option>
        </select>
      </label>
    </div>
  </section>
);

export default PartyFilters;
