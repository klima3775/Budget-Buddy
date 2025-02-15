import Search from "../../Components/Search/Search";
import "./SearchBar.scss";
import IconSearch from "../../Components/IconSearch/IconSearch";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <Search />
      <IconSearch />
    </div>
  );
};

export default SearchBar;
