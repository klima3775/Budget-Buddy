import CardBlock from "../CardBlock/CardBlock";

import FinancialOverview from "../FinancialOverview/FinancialOverview";
import Dashboard from "../Dashboard/Dashboard";
import "./Cabinet.scss";
const Cabinet = () => {
  return (
    <div className="cabinet">
      <CardBlock />
      <div className="content">
        <Dashboard />
        <FinancialOverview />
      </div>
    </div>
  );
};

export default Cabinet;
