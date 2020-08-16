import React from "react";
import { useHistory } from "react-router-dom";

import { Button, Form, FormControl, Navbar } from "react-bootstrap";

export const Search = ({ query, setQuery, doFetch }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (query === "") return;
    doFetch(`http://localhost:5000/api/movies/search?q=${query}`);
    history.push("/");
  };

  let history = useHistory();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">TheMovieDB</Navbar.Brand>
      <Form inline onSubmit={handleFormSubmit} style={formStyle}>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>
    </Navbar>
  );
};

const formStyle = {
  width: "100%",
  margin: "10px",
  display: "flex",
  justifyContent: "center",
};
