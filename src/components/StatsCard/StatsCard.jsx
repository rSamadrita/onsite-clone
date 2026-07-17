import "./StatsCard.css";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";

const StatsCard = ({
  title,
  value,
  icon,
  color,
  change,
  trending,
}) => {
  return (
    <div className="stats-card">

      <div
        className="stats-icon"
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className="stats-content">

        <p className="stats-title">{title}</p>

        <h2 className="stats-value">{value}</h2>

        {change && (
          <div className={`stats-change ${trending === 'up' ? 'trending-up' : 'trending-down'}`}>
            {trending === 'up' ? <MdTrendingUp /> : <MdTrendingDown />}
            <span>{change}</span>
          </div>
        )}

      </div>

    </div>
  );
};

export default StatsCard;