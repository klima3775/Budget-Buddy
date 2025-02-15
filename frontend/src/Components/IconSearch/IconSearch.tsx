import { ReactComponent as Plus } from "../../assets/searchBar/plus.svg";
import { ReactComponent as Upper } from "../../assets/searchBar/upper.svg";
import { ReactComponent as Calendar } from "../../assets/searchBar/calendar.svg";
import "./IconSearch.scss";

const iconSearch = () => {
  return (
    <div className="icon-search">
      <div className="icon-container">
        <Plus className="icon" />
      </div>
      <div className="icon-container">
        <Upper className="icon" />
      </div>
      <div className="icon-container">
        <Calendar className="icon" />
      </div>
    </div>
  );
};

export default iconSearch;
