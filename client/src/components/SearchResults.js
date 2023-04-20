import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProductsContext } from "../store/Store";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";
const SearchResults = () => {
  let { dispatch, error, loading } = useContext(ProductsContext);
  let [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");
  let fetchSearchResult = async () => {
    try {
      dispatch({ type: "DATA_LOADING", payload: { loading: true } });
      let res = await fetch(`/search?q=${query}`);
      let response = await res.json();
      if (res.status === 200) {
        let { products } = response;
        setSearchResults(products);
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      } else {
        let { error } = response;
        dispatch({ type: "SET_ERROR", payload: { error: error } });
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: { error: error } });
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
    }
  };
  useEffect(() => {
    fetchSearchResult();
  }, []);
  return (
    <div className="search-results">
      <div className="container">
        <Link to={"/products"} className="go-back-btn">
          <i class="fa-solid fa-arrow-left"></i> Go Back
        </Link>
        {error && <Error error={error} />}
        <div className="row">
          {loading ? (
            <Loading />
          ) : searchResults.length > 0 ? (
            searchResults.map((product, index) => {
              return <Product product={product} key={index} />;
            })
          ) : (
            <p className="text-center">{`No Result found against this "${query}" query`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
