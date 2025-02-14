import { useState } from "react";
import "./Search.scss";
import { ReactComponent as SearchIcon } from "../../assets/searchBar/search.svg";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    performSearch(value);
  };

  const performSearch = (query: string) => {
    // Здесь вы можете добавить логику для выполнения поиска
    console.log("Поисковый запрос:", query);
  };

  return (
    <div className="search">
      <SearchIcon className="search-icon" />
      <input type="text" value={searchTerm} onChange={handleInputChange} />
    </div>
  );
};

export default Search;
