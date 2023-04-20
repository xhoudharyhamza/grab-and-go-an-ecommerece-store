import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductsContext } from "../store/Store";
import Loading from "./Loading";
import { fetchSingleProduct} from "../api/api";
import { addProductToCart } from "../utils/utils";
import Rating from "./Rating";
import SimilarProducts from "./SimilarProducts";
const SingleProductDetails = () => {
  let { singleProduct, loading, dispatch, user } = useContext(ProductsContext);
  let params = useParams();
  useEffect(() => {
    fetchSingleProduct(params.slug, dispatch);
  }, [params.slug]);
  return (
    <>
      {loading && <Loading />}
      {singleProduct && (
        <div>
          <div className="single-product">
            <div className="container">
              <div className="row">
                <div className="col-md-5 col-sm-12 col-lg-5">
                  <div className="single-product-image">
                    <img src={singleProduct.image} />
                  </div>
                </div>
                <div className="col-md-7 col-lg-7 col-sm-12">
                  <div className="single-product-body">
                    <h2>{singleProduct.title}</h2>
                    <p>{singleProduct.description}</p>
                    <p className="single-product-price">
                      ${singleProduct.price}
                    </p>
                    <Rating rating={singleProduct.rating.rate} />
                    {singleProduct.rating.count > 0 ? (
                      <span className="badge text-bg-success">In Stock</span>
                    ) : (
                      <span className="badge text-bg-dark">Out Of Stock</span>
                    )}
                    {user ? (
                      <button
                        className="single-product-btn"
                        onClick={() => {
                          addProductToCart(singleProduct._id, dispatch);
                        }}
                      >
                        Add To Cart
                      </button>
                    ) : (
                      <Link className="login-btn" to={"/accounts/login"}>
                        {" "}
                        LogIn to Grab Product
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* same category products */}
          <div className="similar-product">
            <div className="container">
              <div className="row">
                <SimilarProducts
                  category={singleProduct.category}
                  currentProductId={singleProduct._id}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductDetails;
