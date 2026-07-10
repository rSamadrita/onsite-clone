import "./BudgetOverview.css";

const BudgetOverview = () => {

  const budget = 15000000;

  const spent = 6500000;

  return (

    <div className="budget-card">

      <h2>Budget Overview</h2>

      <div className="budget-row">

        <span>Total Budget</span>

        <strong>
          ₹ {budget.toLocaleString("en-IN")}
        </strong>

      </div>

      <div className="budget-row">

        <span>Spent</span>

        <strong className="spent">

          ₹ {spent.toLocaleString("en-IN")}

        </strong>

      </div>

      <div className="budget-row">

        <span>Remaining</span>

        <strong className="remaining">

          ₹ {(budget-spent).toLocaleString("en-IN")}

        </strong>

      </div>

    </div>

  );

};

export default BudgetOverview;