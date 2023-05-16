import React, { useContext, useEffect } from "react";
import { ProductsContext } from "../store/Store";
import { Link } from "react-router-dom";
import { calculateTotalAmount } from "../utils/utils";
const TotalAmount = () => {
  let { cart, dispatch, totalAmount } = useContext(ProductsContext);
  let totalItems = cart.reduce((item, product) => {
    return item + product.quantity;
  }, 0);
  useEffect(() => {
    calculateTotalAmount(dispatch, cart);
  }, [cart]);
  return (
    <div className="total-amount">
    <h6>Items: ({totalItems})</h6>
    <h3>Total: ${totalAmount}</h3>
    <div className="checkout-details">
      <h4>Checkout Details:</h4>
      <ul>
        <li>Free shipping for orders</li>
        <li>Delivery within 2-3 business days</li>
        <li>Easy returns within some days</li>
      </ul>
    </div>
    <Link className="btn btn-primary checkout-btn" to="/checkout">
      Proceed to Checkout
    </Link>
  </div>
  );
};

export default TotalAmount;
