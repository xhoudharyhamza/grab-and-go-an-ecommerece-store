import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import Product from "./Product";
import Error from "./Error";
import { nullErrors } from "../utils/utils";
import { fetchCategoriesProducts } from "../api/api";
import { ProductsContext } from "../store/Store";
import ArrangeProductsFilter from "./ArrangeProductsFilter";
import PriceRangeFilter from "./PriceRangeFilter";
const CategoryProducts = () => {
  let params = useParams();
  let { rangeProducts, error, loading, dispatch } = useContext(ProductsContext);
  useEffect(() => {
    fetchCategoriesProducts(params.category, dispatch);
    nullErrors(dispatch);
  }, [params.category]);
  return (
    <>
      {error && <Error error={error} />}
      {loading ? (
        <Loading />
      ) : rangeProducts.length > 0 ? (
        <div className="category-products">
          <div className="container">
            <div className="row">
              <p className="mt-2">
                <Link to={"/"}>Home</Link>
                {`> Category > ${params.category}`}
              </p>
              <ArrangeProductsFilter />
              <PriceRangeFilter />
              {rangeProducts.map((product, index) => {
                return <Product key={index} product={product} />;
              })}
            </div>
          </div>
        </div>
      ) : undefined}
    </>
  );
};

export default CategoryProducts;
