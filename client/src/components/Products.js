import React, { useContext, useEffect } from "react";
import Loading from "./Loading";
import Product from "./Product";
import { ProductsContext } from "../store/Store";
import { fetchProducts } from "../api/api";
import FilterProducts from "./FilterProducts";
import SearchFilter from "./SearchFilter";
const Products = () => {
  let { rangeProducts, loading, dispatch } = useContext(ProductsContext);
  useEffect(() => {
    fetchProducts(dispatch);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        rangeProducts.length > 0 && (
          <div className="container">
            <div className="products">
              <h2 style={{ textAlign: "center", marginTop: "1.5rem" }}>
                Products
              </h2>
              <FilterProducts />
              <div className="row">
                <SearchFilter />
                {rangeProducts.map((product, index) => {
                  return <Product product={product} key={index} />;
                })}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Products;
