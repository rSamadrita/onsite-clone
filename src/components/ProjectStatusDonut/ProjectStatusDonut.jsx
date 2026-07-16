import "./ProjectStatusDonut.css";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#27ae60", "#2f80ed", "#f2994a"];

const CustomLabel = ({ cx, cy, total }) => (
  <>
    <text x={cx} y={cy - 8} textAnchor="middle" fill="#1d2939" fontSize={28} fontWeight={700}>
      {total}
    </text>
    <text x={cx} y={cy + 14} textAnchor="middle" fill="#8b8b8b" fontSize={12}>
      Total
    </text>
  </>
);

const ProjectStatusDonut = ({ projects }) => {
  const navigate = useNavigate();

  const active    = projects.filter((p) => p.status === "active"    || !p.status).length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const upcoming  = projects.filter((p) => p.status === "upcoming" ).length;
  const total     = projects.length;

  const data = [
    { name: "Active Projects", value: active    || 0, color: COLORS[0] },
    { name: "Completed",       value: completed || 0, color: COLORS[1] },
    { name: "Upcoming",        value: upcoming  || 0, color: COLORS[2] },
  ];

  // Always show something in the donut when there's no real data
  const chartData = total === 0
    ? [{ name: "No Projects", value: 1, color: "#e5e7eb" }]
    : data;

  return (
    <div className="project-donut">
      <div className="project-donut__header">
        <h3 className="project-donut__title">Project Status</h3>
      </div>

      <div className="project-donut__body">
        {/* Donut */}
        <div className="project-donut__chart">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                label={false}
              >
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              {total > 0 && (
                <Tooltip
                  formatter={(value, name) => [value, name]}
                  contentStyle={{ borderRadius: 10, fontSize: 13 }}
                />
              )}
            </PieChart>
          </ResponsiveContainer>
          {/* Center label rendered absolutely */}
          <div className="project-donut__center">
            <span className="project-donut__total">{total}</span>
            <span className="project-donut__total-label">Total</span>
          </div>
        </div>

        {/* Legend */}
        <ul className="project-donut__legend">
          {data.map((item) => (
            <li key={item.name} className="project-donut__legend-item">
              <span className="project-donut__legend-dot" style={{ background: item.color }} />
              <span className="project-donut__legend-name">{item.name}</span>
              <span className="project-donut__legend-count">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="project-donut__btn" onClick={() => navigate("/projects")}>
        View All Projects &rsaquo;
      </button>
    </div>
  );
};

export default ProjectStatusDonut;
