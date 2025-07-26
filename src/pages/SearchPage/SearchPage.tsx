import React, { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { Input } from "antd";
import { Link } from "react-router-dom";

import { postSearch } from "./postSearch";
import { postSearchMore } from "./postSearchMore";
import { lookCategory } from "../../lib/data/categories";
import { colors } from "../../lib/data/colors";
import { pattern } from "../../lib/data/pattern";
import { seasons } from "../../lib/data/seasons";
import { convertCodeToObjectString } from "../../helpers/convertCodeTo";
import { userStore } from "../../stores/userStore/userStore.js";
import { profileStore } from "../../stores/profileStore/profileStore.js";

import "./SearchPage.less";

const { Search } = Input;

interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface Item {
  id: string;
  title: string;
  brand?: string;
  mediaId: string;
  colors: string[];
  pattern?: string;
}

interface Look {
  id: string;
  title: string;
  mediaId: string;
  category?: string;
  season?: string;
  items: any[];
}

interface SearchResults {
  count: number;
  users: User[];
  items: Item[];
  looks: Look[];
}

export const SearchPage: React.FC = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | false>(false);
  const [results, setResults] = useState<SearchResults | null>(null);

  const handleEnter = async (e: KeyboardEvent<HTMLInputElement>): Promise<void> => {
    setResults(null);
    const target = e.target as HTMLInputElement;
    if (!target.value) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    setSearchValue(target.value);
    const response = await postSearchMore(target.value);
    if (response) {
      setResults(response);
    } else {
      setResults(null);
    }
    setIsSearching(false);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setResults(null);
    if (!e.target.value) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    setSearchValue(e.target.value);
    const response = await postSearch(e.target.value);
    if (response) {
      setResults(response);
    } else {
      setResults(null);
    }
    setIsSearching(false);
  };

  const handleSearch = async (value: string): Promise<void> => {
    setResults(null);
    if (!value) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    setSearchValue(value);
    const response = await postSearchMore(value);
    if (response) {
      setResults(response);
    } else {
      setResults(null);
    }
    setIsSearching(false);
  };

  useEffect(() => {
    if (results && !isSearching && searchValue) {
      const resultElements = document.getElementsByClassName("resultContent");
      const regex = new RegExp(searchValue as string, "gi");
      Array.from(resultElements).forEach((element) => {
        const content = element.textContent;
        if (content) {
          const highlightedContent = content.replace(
            regex,
            (match) => `<span class="highlight">${match}</span>`,
          );
          element.innerHTML = highlightedContent;
        }
      });
    }
  }, [results, isSearching, searchValue]);

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

      {results && (
        <div className="search__results">Results: {results.count}</div>
      )}

      {!results && <div className="search__empty">Wow, such empty</div>}

      <div>
        {results && results.users.length > 0 && (
          <div className="search__subContainer">
            <div className="search__title">Users</div>
            {results.users.map((user: User) => {
              return (
                <Link
                  to={`/${user.userName}`}
                  onClick={() => {
                    profileStore.fetchProfileData(user.userName);
                  }}
                  key={user.id}
                >
                  <div className="search__resultItem">
                    <div className="search__resultItemPictures">
                      <img src={user.avatar} className="search__picture" alt={user.userName} />
                    </div>
                    <div className="search__resultItemData">
                      <div className="search__resultItemDataRow bold resultContent">
                        {user.userName}
                      </div>
                      <div className="search__resultItemDataRow grey resultContent">
                        {user.firstName} {user.lastName}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {results && results.items.length > 0 && (
          <div className="search__subContainer">
            <div className="search__title">Items</div>
            {results.items.map((item: Item) => {
              return (
                <div className="search__resultItem" key={item.id}>
                  <div className="search__resultItemPictures">
                    <img src={item.mediaId} className="search__picture" alt={item.title} />
                  </div>
                  <div className="search__resultItemData">
                    <div className="search__resultItemDataRow bold resultContent">
                      {item.title}
                    </div>
                    <div className="search__resultItemDataRow grey resultContent">
                      {item.brand && `${item.brand}  `}
                      {item.colors.length > 0 &&
                        item.colors.map((color: string) => {
                          return `${
                            convertCodeToObjectString(color, colors)[
                              userStore.language
                            ]
                          }  `;
                        })}
                      {item.pattern &&
                        `${
                          convertCodeToObjectString(item.pattern, pattern)[
                            userStore.language
                          ]
                        }  `}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {results && results.looks.length > 0 && (
          <div className="search__subContainer">
            <div className="search__title">Looks</div>
            {results.looks.map((look: Look) => {
              return (
                <div className="search__resultItem" key={look.id}>
                  <div className="search__resultItemPictures">
                    <img src={look.mediaId} className="search__picture" alt={look.title} />
                  </div>
                  <div className="search__resultItemData">
                    <div className="search__resultItemDataRow bold resultContent">
                      {look.title}
                    </div>
                    <div className="search__resultItemDataRow grey resultContent">
                      {!!look.category &&
                        `${
                          convertCodeToObjectString(
                            look.category,
                            lookCategory,
                          )[userStore.language]
                        }  `}
                      {!!look.season &&
                        `${
                          convertCodeToObjectString(look.season, seasons)[
                            userStore.language
                          ]
                        }  `}
                      {look.items.length > 0 &&
                        `${look.items.length} item${
                          look.items.length > 1 ? "s" : ""
                        }  `}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
