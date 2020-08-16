import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { dataFetchReducer } from "./reducer";

import styles from "./movieDetail.module.css";
import imdb from "../imdb.png";

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

function MovieDetails({}) {
  let { id } = useParams();
  const url = `http://localhost:5000/api/movies/${id}`;
  const [{ data, isLoading, isError }, doFetch] = useDataApi(url, {});
  console.log(data);
  return (
    <>
      {isError && <div>Something went wrong!!</div>}
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title}
            />
          </div>
          <div className={styles.details}>
            <h1>{data.title}</h1>
            <p>{data.overview}</p>
            <p>
              <span>Release Date: </span>
              {data.release_date}
            </p>
            <p>
              <span>Rating: </span>
              {data.vote_average}
            </p>
            <p>
              <a
                href={`https://www.imdb.com/title/${data.imdb_id}`}
                target="_blank"
              >
                <img src={imdb} alt="imdb-link" height="60" />
              </a>
            </p>
            {data.genres &&
              data.genres.map((el) => (
                <span className={styles.genre} key={el.id}>
                  {el.name}
                </span>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
