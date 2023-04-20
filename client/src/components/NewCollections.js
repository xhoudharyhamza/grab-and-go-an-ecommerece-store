import React, { useContext, useEffect } from "react";
import { fetchNewCollections } from "../api/api";
import { ProductsContext } from "../store/Store";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const NewCollections = () => {
  let { newCollections, loading, dispatch } = useContext(ProductsContext);
  useEffect(() => {
    fetchNewCollections(dispatch);
  }, []);
  return (
    <div className="new-collections">
  {loading && <Loading />}
  <h2>New Collections</h2>
  <div className="new-collections-products">
    <div className="new-collections-products-body">
      {newCollections &&
        newCollections.map((product, index) => {
          return (
            <div className="card new-collections-product" key={index}>
              <Link to={`/products/${product.slug}`}>
                <img
                  src={product.image}
                  className="card-img-top new-collections-product-image"
                  alt="..."
                />
              </Link>
              <div className="card-body new-collections-product-body">
                <p className="card-text new-collections-product-title">
                  {product.title}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  </div>
</div>

  );
};

export default NewCollections;
