import "./ProgressChart.css";

const ProgressChart = () => {
  const progress = 68;

  return (
    <div className="progress-card">

      <div className="card-header">

        <h2>Project Progress</h2>

        <span>{progress}%</span>

      </div>

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />

      </div>

      <div className="progress-stats">

        <div>

          <small>Completed</small>

          <h3>68%</h3>

        </div>

        <div>

          <small>Remaining</small>

          <h3>32%</h3>

        </div>

      </div>

    </div>
  );
};

export default ProgressChart;