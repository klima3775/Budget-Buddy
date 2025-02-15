import CardBlock from "../CardBlock/CardBlock";
import SearchBar from "../SearchBar/SearchBar";
import Transactions from "../../Components/Transactions/Transactions"; // test variant
const Cabinet = () => {
  return (
    <div className="cabinet">
      <CardBlock />
      <SearchBar />
      <Transactions />
    </div>
  );
};

export default Cabinet;
