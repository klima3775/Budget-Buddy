import ExchangeRate from "../../Components/ExchangeRate/ExchangeRate";
import "./FinancialOverview.scss";
import Stats from "../../Components/Stats/Stats";

const FinancialOverview: React.FC = () => {
  return (
    <div className="financial-overview">
      <ExchangeRate />
      <Stats />
    </div>
  );
};

export default FinancialOverview;
