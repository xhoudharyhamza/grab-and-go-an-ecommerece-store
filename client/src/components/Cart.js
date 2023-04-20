import React, { useContext } from "react";
import { ProductsContext } from "../store/Store";
import CartProduct from "./CartProduct";
import TotalAmount from "./TotalAmount";
const Cart = () => {
  let { cart } = useContext(ProductsContext);
  return (
    <>
      {cart.length > 0 ? (
        <div className="container shopping-cart">
          <div className="row">
            <div className="col-md-8 col-lg-8 col-sm-12">
              {cart.map((product, index) => {
                return <CartProduct product={product} key={index} />;
              })}
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12">
              <TotalAmount/>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-shopping-cart">
          <h3>Your Cart is Empty</h3>
        </div>
      )}
    </>
  );
};

export default Cart;
