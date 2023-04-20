import React, { useContext, useEffect } from "react";
import { ProductsContext } from "../store/Store";
import { fetchTopRatedProducts } from "../api/api";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const TopRatedProducts = () => {
  let { topRatedProducts, loading, dispatch } = useContext(ProductsContext);
  useEffect(() => {
    fetchTopRatedProducts(dispatch);
  }, []);
  return (
    <div className="new-collections">
      {loading && <Loading />}
      <h2>Top Rated</h2>
      <div className="new-collections-products">
        <div className="new-collections-products-body">
          {topRatedProducts &&
            topRatedProducts.map((product, index) => {
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
                    {/* <Rating rating={product.rating.rate} />
                    <p>
                      <b>${product.price}</b>
                    </p> */}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>  );
};

export default TopRatedProducts;
