import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../store/Store";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
const ShippingAddress = () => {
  let navigate = useNavigate();
  let { shippingAddress, dispatch, user, error } = useContext(ProductsContext);
  let [shippingDetails, setShippingDetails] = useState({
    email: "",
    phone: "",
    city: "",
    address: "",
  });
  let shippingChangeHandler = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };
  let shippingDetailsVerify = (e) => {
    e.preventDefault();
    const regex =
      /^(03\d{2}|04\d{2}|05\d{2}|06\d{2}|07\d{2}|08\d{2}|09\d{2})\d{7}$/;
    if (!regex.test(shippingDetails.phone)) {
      dispatch({
        type: "SET_ERROR",
        payload: { error: "Please Enter Valid Phone Number" },
      });
    } else {
      dispatch({ type: "SET_SHIPPING_DETAILS", payload: { shippingDetails } });
      navigate("/checkout/confirm-shipping");
    }
  };
  useEffect(() => {
    if (shippingAddress) {
      setShippingDetails({ ...shippingAddress });
    }
  }, [user, shippingAddress]);
  return (
    <div className="container">
      <div className="shipping-details">
        <div className="shipping-address">
          <h2>Shipping Details</h2>
          <form onSubmit={shippingDetailsVerify}>
            {error && <Error error={error} />}
            <div className="form-group">
              <label htmlFor="shipping-details">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="shipping-details"
                placeholder="Enter Email"
                name="email"
                required
                value={shippingDetails.email}
                onChange={shippingChangeHandler}
              />
              <div className="form-group">
                <label htmlFor="shipping-phone">
                  Contact Number (+92-3XX-XXXXXXX)
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="shipping-phone"
                  placeholder="+92-3XX-XXXXXXX"
                  name="phone"
                  required
                  value={shippingDetails.phone}
                  onChange={shippingChangeHandler}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                placeholder="City Name"
                name="country"
                required
                value="Pakistan"
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="shipping-city">City Name</label>
              <input
                type="text"
                className="form-control"
                id="shipping-city"
                placeholder="City Name"
                name="city"
                required
                value={shippingDetails.city}
                onChange={shippingChangeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="shipping-address">Enter Address</label>
              <input
                type="text"
                className="form-control"
                id="shipping-address"
                placeholder="Address"
                name="address"
                required
                value={shippingDetails.address}
                onChange={shippingChangeHandler}
              />
            </div>

            <button type="submit">Continue Checkout</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
