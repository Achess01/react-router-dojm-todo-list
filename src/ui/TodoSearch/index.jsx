import React from "react";
import "./TodoSearch.css";

function TodoSearch({ searchValue, setSearchValue, loading, searchParam }) {
  const onSearchValueChange = (event) => {
    setSearchValue({ [searchParam]: event.target.value });
  };

  return (
    <input
      className="TodoSearch"
      placeholder="Cebolla"
      value={searchValue.get(searchParam) || ""}
      onChange={onSearchValueChange}
      onBlur={onSearchValueChange}
      disabled={loading}
    />
  );
}

export { TodoSearch };
