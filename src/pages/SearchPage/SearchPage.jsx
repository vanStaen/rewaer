import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

import "./SearchPage.less";

export const SearchPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResult] = useState(null);

  const handleEnter = (e) => {
    console.log("enter", e.target.value);
    setIsSearching(true);
  };

  const handleChange = (e) => {
    console.log("change", e.target.value);
  };

  const handleSearch = (value) => {
    console.log(value);
    setIsSearching(true);
  };

  return (
    <div className="search__container">
      <Search
        placeholder="What are you looking for?"
        enterButton="Search"
        size="large"
        onPressEnter={handleEnter}
        onSearch={handleSearch}
        onChange={handleChange}
        loading={isSearching}
      />
      {results}
    </div>
  );
};
