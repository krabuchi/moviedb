import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.module.css";

import { Search } from "./components/Search";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import useDataApi from "./components/useDataApi";

const App = () => {
  const [query, setQuery] = useState("");

  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    `https://moviedb-backend.herokuapp.com/api/movies`,
    []
  );
  return (
    <Router>
      <Search doFetch={doFetch} query={query} setQuery={setQuery} />

      {isError && <div>Something went wrong!!</div>}

      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <Switch>
          <Route
            exact
            path="/moviedb"
            render={() => <MovieList data={data} />}
          />
          <Route exact path="/moviedb/movie/:id" component={MovieDetails} />
        </Switch>
      )}
    </Router>
  );
};

export default App;
