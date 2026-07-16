import "./BudgetChart.css";
import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DATA_YEAR = [
  { month: "Jan", budget: 20, expenses: 5  },
  { month: "Feb", budget: 30, expenses: 18 },
  { month: "Mar", budget: 38, expenses: 26 },
  { month: "Apr", budget: 45, expenses: 34 },
  { month: "May", budget: 55, expenses: 42 },
  { month: "Jun", budget: 62, expenses: 50 },
  { month: "Jul", budget: 70, expenses: 58 },
];

const DATA_MONTH = [
  { month: "W1", budget: 8,  expenses: 3  },
  { month: "W2", budget: 14, expenses: 9  },
  { month: "W3", budget: 20, expenses: 15 },
  { month: "W4", budget: 26, expenses: 22 },
];

const formatY = (v) => `${v}L`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="budget-tooltip">
      <p className="budget-tooltip__label">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: ₹{p.value}L
        </p>
      ))}
    </div>
  );
};

const BudgetChart = () => {
  const [period, setPeriod] = useState("year");
  const data = period === "year" ? DATA_YEAR : DATA_MONTH;

  return (
    <div className="budget-chart">
      <div className="budget-chart__header">
        <h3 className="budget-chart__title">Budget vs Expenses</h3>
        <div className="budget-chart__legend">
          <span><span className="dot dot--red" />Budget</span>
          <span><span className="dot dot--blue" />Expenses</span>
        </div>
        <select
          className="budget-chart__select"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="year">This Year</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="budgetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#e03131" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#e03131" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expensesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#2f80ed" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#2f80ed" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#8b8b8b" }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={formatY} tick={{ fontSize: 12, fill: "#8b8b8b" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="budget"
            name="Budget"
            stroke="#e03131"
            strokeWidth={2}
            fill="url(#budgetGrad)"
            dot={{ r: 4, fill: "#e03131", strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#2f80ed"
            strokeWidth={2}
            fill="url(#expensesGrad)"
            dot={{ r: 4, fill: "#2f80ed", strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetChart;
