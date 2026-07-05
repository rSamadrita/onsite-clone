import "./QuickActionCard.css";

import { HiArrowRight } from "react-icons/hi2";

const QuickActionCard = ({
  icon,
  title,
  subtitle,
  color,
  onClick,
}) => {
  return (
    <div
      className="quick-card"
      onClick={onClick}
    >
      <div
        className="quick-icon"
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className="quick-content">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>

      <HiArrowRight className="quick-arrow" />
    </div>
  );
};

export default QuickActionCard;