import React, { useState } from "react";
import { Input } from "antd";

import { postSearch } from "./postSearch";
import { postSearchMore } from "./postSearchMore";

import "./SearchPage.less";

const { Search } = Input;

export const SearchPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResult] = useState(null);

  const handleEnter = async (e) => {
    setIsSearching(true);
    if (!e.target.value) {
      return;
    }
    const response = await postSearchMore(e.target.value);
    if (response.length > 0) {
      setResult(response);
    } else {
      setResult(null);
    }
    setIsSearching(false);
  };

  const handleChange = async (e) => {
    setIsSearching(true);
    if (!e.target.value) {
      return;
    }
    const response = await postSearch(e.target.value);
    if (response.length > 0) {
      setResult(response);
    } else {
      setResult(null);
    }
    setIsSearching(false);
  };

  const handleSearch = async (value) => {
    setIsSearching(true);
    if (!value) {
      return;
    }
    const response = await postSearchMore(value);
    if (response.length > 0) {
      setResult(response);
    } else {
      setResult(null);
    }
    setIsSearching(false);
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
