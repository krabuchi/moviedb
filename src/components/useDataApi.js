import { useReducer, useState, useEffect } from "react";
import { dataFetchReducer } from "./reducer";
import axios from "axios";

const useDataApi = (initialUrl, initialData) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios.get(url);
        if (!didCancel) {
          dispatch({
            type: "FETCH_SUCCESS",
            payload: result.data,
          });
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

export default useDataApi;
