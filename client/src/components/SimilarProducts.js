import React, { useContext, useEffect } from "react";
import { ProductsContext } from "../store/Store";
import { fetchSimilarProducts } from "../api/api";
import Product from "./Product";
import Loading from "./Loading";
const SimilarProducts = ({ category, currentProductId }) => {
  let { dispatch, similarProducts, loading } = useContext(ProductsContext);
  useEffect(() => {
    fetchSimilarProducts(category, dispatch);
  }, [category]);
  return (
    <>
      <div className="category-products">
        <div className="container">
          {loading && <Loading />}
          {similarProducts.length>0 && (
            <div className="row">
              {similarProducts ? (
                <>
                  {similarProducts
                    .filter((product) => {
                      return product._id !== currentProductId;
                    })
                    .map((product, index) => {
                      return (
                        <Product index={index} product={product} key={index} />
                      );
                    })}
                </>
              ) : (
                <Loading />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SimilarProducts;
