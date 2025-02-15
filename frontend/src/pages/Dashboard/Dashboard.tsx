import SearchBar from "../SearchBar/SearchBar";
import Transactions from "../../Components/Transactions/Transactions";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <SearchBar />
      <Transactions />
    </div>
  );
};

export default Dashboard;
