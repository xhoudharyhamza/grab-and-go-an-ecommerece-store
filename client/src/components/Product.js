import React, { useContext } from "react";
import Rating from "./Rating";
import { Link, useNavigate } from "react-router-dom";
import { addProductToCart } from "../utils/utils";
import { ProductsContext } from "../store/Store";
const Product = ({product }) => {
  let navigate = useNavigate();
  let { dispatch, user } = useContext(ProductsContext);
  let { _id, title, slug, image, price, rating } = product;
  // if (title.length > 17) {
  //   title = title.slice(0, 22).concat("...");
  // } else {
  //   title = title;
  // }
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
      <div className="product">
        <Link to={`/products/${slug}`}>
          <img src={image} alt="" className="product-image" />
        </Link>
        <div className="product-body">
          <h5 className="product-title">{title}</h5>
          <p className="product-price">${price}</p>
          <Rating rating={rating.rate} />
          <button
            className="product-btn"
            onClick={() => {
              user
                ? addProductToCart(_id, dispatch)
                : navigate("/accounts/login");
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
