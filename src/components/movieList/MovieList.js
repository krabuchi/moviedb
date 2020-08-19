import React from "react";
import { Link } from "react-router-dom";
import styles from "./movieList.module.css";

const MovieList = ({ data }) => {
  let movies = data.map((movie) => {
    let { id, title, release_date, poster_path } = movie;
    let year = release_date ? release_date.split("-")[0] : release_date;
    let s = title ? title.split("") : "";
    let newTitle = s.length > 14 ? s.slice(0, 14).join("") + "..." : s;
    return (
      <Link key={id} to={`movie/${id}`} className={styles.link}>
        <li className={styles.li}>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
          <div className={styles.titleContainer}>
            <span>{newTitle}</span>
            <br />
            <small>{year}</small>
          </div>
        </li>
      </Link>
    );
  });

  return <ul className={styles.ul}>{movies}</ul>;
};
export default MovieList;
