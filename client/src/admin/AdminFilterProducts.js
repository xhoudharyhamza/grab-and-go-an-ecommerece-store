import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../store/Store";
import { fetchProducts } from "../api/api";
import { nullErrors } from "../utils/utils";
const AdminFilterProducts = () => {
  let { dispatch } = useContext(ProductsContext);
  let [search, setSearch] = useState("");
  let fetchSearchProducts = async () => {
    if (search === "") {
      fetchProducts(dispatch);
    } else {
      let res = await fetch(`/products/search/${search}`);
      dispatch({ type: "DATA_LOADING", payload: { loading: true } });
      let response = await res.json();
      if (res.status === 200) {
        let { products } = response;
        dispatch({ type: "SET_PRODUCTS", payload: { products } });
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      } else {
        let { error } = response;
        dispatch({ type: "SET_ERROR", payload: { error } });
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      }
    }
  };
  useEffect(() => {
    fetchSearchProducts();
  }, [search]);
  
  useEffect(()=>{
    nullErrors(dispatch)
  },[])
  return (
    <div className="admin-search-products">
      <input
        type="search"
        placeholder="Search Products"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default AdminFilterProducts;
