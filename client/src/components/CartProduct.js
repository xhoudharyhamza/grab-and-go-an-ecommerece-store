import React, { useContext } from "react";
import { changeProductQuantity, removeProductFromCart } from "../utils/utils";
import { ProductsContext } from "../store/Store";
const CartProduct = ({ product }) => {
  let { dispatch } = useContext(ProductsContext);
  let { _id, title, image, price, size, sizes, rating, quantity } = product;
  return (
    <div className="container">
      <div className="row cart-item">
        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
          <img src={image}></img>
        </div>
        <div className="col-md-8 col-lg-8 col-sm-8 col xs-8 cart-item-data">
          <h4>{title}</h4>
          <p>
            <strong>${price}</strong>
          </p>
          {sizes && sizes.length > 0 ? (
            <div className="form-group cart-product-size">
              <label htmlFor="product-size">Select Size</label>
              <select
                required
                onChange={(e) => {
                  dispatch({
                    type: "UPDATE_CART_PRODUCT_SIZE",
                    payload: { size: e.target.value, id: _id },
                  });
                }}
                value={size && size}
                className="form-select product-size"
                aria-label="Default select example"
                // value={productSize}
                // onChange={(e) => {
                //   setProductSize(e.target.value);
                // }}
                id="product-size"
              >
                {sizes.map((size, index) => {
                  return (
                    <option value={size} key={index}>
                      {size.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
          {/* <Rating rating={rating.rate} /> */}
          <div className="cart-product-quantity">
            <button
              className="decrement-product-quantity"
              onClick={() => {
                changeProductQuantity("decrement", _id, dispatch);
              }}
              disabled={quantity === 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <p>{quantity}</p>
            <button
              className="increment-product-quantity"
              onClick={() => {
                changeProductQuantity("increment", _id, dispatch);
              }}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <button
            className="remove-cart-product"
            onClick={() => {
              removeProductFromCart(_id, dispatch);
            }}
          >
            <i className="fa-solid fa-trash text-danger"></i>
          </button>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default CartProduct;
