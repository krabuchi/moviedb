import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./Search.module.css";

export const Search = ({ query, setQuery, doFetch, data }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (query === "") return;
    doFetch(
      `https://moviedb-backend.herokuapp.com/api/movies/search?q=${query}`
    );
    history.push("/");
  };

  let history = useHistory();

  return (
    <header className={styles.header}>
      <a href="/" onClick={() => history.go[0]}>
        <h1>Movie Portal</h1>
      </a>
      <form onSubmit={handleFormSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles.searchButton} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
