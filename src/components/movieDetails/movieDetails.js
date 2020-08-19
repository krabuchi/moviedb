import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { dataFetchReducer } from "../reducer";

import styles from "./movieDetail.module.css";
import imdb from "../../assets/imdb.png";
import Loading from "../loading-and-error/loading";
import Error from "../loading-and-error/error";

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios(url);

        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};

export default function MovieDetails() {
  let { id } = useParams();
  const url = `https://moviedb-backend.herokuapp.com/api/movies/${id}`;
  const [{ data, isLoading, isError }] = useDataApi(url, {});

  return (
    <>
      {isError && <Error>Oops!</Error>}
      {isLoading ? (
        <Loading>Almost up</Loading>
      ) : (
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={`${data.title}-poster`}
            />
          </div>
          <div className={styles.details}>
            <h1>{data.title}</h1>
            <p>
              <span>{data.release_date}</span>
            </p>
            <div className={styles.genreContainer}>
              {data.genres &&
                data.genres.map((el) => (
                  <span className={styles.genre} key={el.id}>
                    {el.name}
                  </span>
                ))}
            </div>
            <p>{data.overview}</p>

            <p>
              <span>Rating: </span>
              {data.vote_average}
            </p>
            <a
              href={`https://www.imdb.com/title/${data.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={imdb} alt="imdb-link" width="60" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
