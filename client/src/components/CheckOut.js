import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { ProductsContext } from "../store/Store";
const CheckOut = () => {
  let navigate = useNavigate();
  let { user, cart } = useContext(ProductsContext);
  useEffect(() => {
    if (user) {
      navigate("shipping-address");
    } else if (!cart.length > 0) {
      navigate("/cart");
    } else {
      navigate("accounts/login");
    }
  }, [user, cart]);
  return (
    <>
      <div className="container">
        <div className="checkout-steps">
          <ul>
            <li>
              <NavLink
                to={"accounts/login"}
                className="checkout-step"
              >{`Login > `}</NavLink>
            </li>
            <li>
              <NavLink
                to={"shipping-address"}
                className="checkout-step"
              >{`Shipping Address > `}</NavLink>
            </li>
            <li>
              <NavLink
                to={"confirm-shipping"}
                className="checkout-step"
              >{`Confirm Shipping >`}</NavLink>
            </li>
            <li>{`Payment `}</li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default CheckOut;
