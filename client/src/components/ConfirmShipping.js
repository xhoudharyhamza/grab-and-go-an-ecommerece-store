import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductsContext } from "../store/Store";
import { calculateTotalAmount } from "../utils/utils";
import Error from "./Error";
import PayAmount from "./PayAmount";
const ConfirmShipping = () => {
  let { shippingAddress, cart, totalAmount, dispatch, error } =useContext(ProductsContext);
  useEffect(() => {
    calculateTotalAmount(dispatch, cart);
    dispatch({ type: "SET_ERROR", payload: { error: null } });
  }, [cart]);
  return (
    <div className="container">
      <div className="confirm-shipping">
        <h2>Order Summary</h2>
        {error && <Error error={error} />}
        <div className="row">
          <div className="col-md-5 col-lg- 5 col-sm-12">
            <div className="confirm-shipping-address">
              <p>
                <span>Contact</span> {shippingAddress.email},{" "}
                {shippingAddress.phone}
              </p>
              <hr />
              <p>
                <span>Ship to</span> {shippingAddress.address},{" "}
                {shippingAddress.city}, Pakistan
              </p>
            </div>
            <Link
              to={"/checkout/shipping-address"}
              className="change-shipping-address"
            >{`< Change Shipping Address`}</Link>
          </div>
          <div className="col-md-7 col-lg- 7 col-sm-12">
            <div className="product-summary">
              <div className="order-summary">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Item</th>
                      <th scope="col">Size</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((product, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              src={product.image}
                              alt=""
                              className="order-product-image"
                            />
                          </td>
                          <td>{product.title}</td>
                          <td>{product.size}</td>
                          <td>{product.quantity}</td>
                          <td>${product.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="total-order-amount">
              <p>Total</p>
              <h6>${totalAmount}</h6>
            </div>
            <PayAmount totalAmount={totalAmount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmShipping;
