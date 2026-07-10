import "./PartyCard.scss";

const PartyCard = ({ party }) => (
  <article className="party-card">
    <div className="party-card__header">
      <div>
        <p className="party-card__label">{party.type}</p>
        <h2>{party.name}</h2>
      </div>
      <span className={`party-card__status party-card__status--${party.status.toLowerCase()}`}>
        {party.status}
      </span>
    </div>

    <div className="party-card__body">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget
        interdum urna.
      </p>
    </div>
  </article>
);

export default PartyCard;
