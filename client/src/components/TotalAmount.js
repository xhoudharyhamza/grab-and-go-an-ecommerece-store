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
      <Link className="btn btn-primary checkout-btn" to="/checkout">
       CheckOut
      </Link>
    </div>
  );
};

export default TotalAmount;
