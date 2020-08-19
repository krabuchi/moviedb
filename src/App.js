import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Search } from "./components/search/Search";
import MovieList from "./components/movieList/MovieList";
import MovieDetails from "./components/movieDetails/movieDetails";
import useDataApi from "./components/useDataApi";
import Footer from "./components/footer/footer";
import Loading from "./components/loading-and-error/loading";
import Error from "./components/loading-and-error/error";

const App = () => {
  const [query, setQuery] = useState("");

  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    `https://moviedb-backend.herokuapp.com/api/movies`,
    []
  );
  return (
    <Router>
      <Search doFetch={doFetch} query={query} setQuery={setQuery} />

      {isError && <Error>Oops</Error>}

      {isLoading ? (
        <Loading>Almost up...</Loading>
      ) : (
        <Switch>
          <Route exact path="/" render={() => <MovieList data={data} />} />
          <Route exact path="/movie/:id" component={MovieDetails} />
        </Switch>
      )}
      <Footer />
    </Router>
  );
};

export default App;
