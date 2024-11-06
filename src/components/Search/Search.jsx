import React from "react";
import "./Search.css";

const Search = ({ setSearch }) => {
  return (
    <textarea
      placeholder="Search..."
      className="search-box"
      rows={1}
      cols={1}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default Search;
