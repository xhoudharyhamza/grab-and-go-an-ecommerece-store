import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../store/Store";
import { loadingFalse, nullErrors } from "../utils/utils";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Rating from "../components/Rating";
const AdminRatings = () => {
  let { loading, error, dispatch, user } = useContext(ProductsContext);
  const [ratings, setRatings] = useState([]);
  let fetchAllRatings = async () => {
    nullErrors(dispatch);
    dispatch({ type: "DATA_LOADING", payload: { loading: true } });
    let res = await fetch("/ratings");
    let response = await res.json();
    if (res.status === 200) {
      let { ratings } = response;
      console.log(ratings);
      setRatings([...ratings]);
      nullErrors(dispatch);
      loadingFalse(dispatch);
    } else {
      let { error } = response;
      loadingFalse(dispatch);
      dispatch({ type: "SET_ERROR", payload: { error } });
    }
  };
  useEffect(() => {
    fetchAllRatings();
  }, []);
  return (
    <div className="container">
      {loading && <Loading />}
      {error && <Error error={error} />}
      <div className="main-div admin-ratings">
        <div className="center-div admin-ratings-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Product</th>
                <th scope="col">Rating</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.user}</td>
                    <td>{item.product}</td>
                    <td>{<Rating rating={item.rate} />}</td>
                    <td>
                      <i className="fa-solid fa-trash delete-rating-btn text-danger"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRatings;
