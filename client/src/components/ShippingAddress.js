import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../store/Store";
import {useNavigate} from "react-router-dom"
const ShippingAddress = () => {
    let navigate= useNavigate()
    let {shippingAddress,dispatch, user}=useContext(ProductsContext)
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
    e.preventDefault()
    dispatch({type:"SET_SHIPPING_DETAILS", payload:{shippingDetails}})
    navigate('/checkout/confirm-shipping')
  };
  useEffect(()=>{
    if(shippingAddress){
        setShippingDetails({...shippingAddress})
    }
    if(!user){
      navigate('/checkout/accounts/login')
    }
  },[user, shippingAddress])
  return (
    <div className="container">
      <div className="shipping-details">
        <div className="shipping-address">
          <h2>Shipping Details</h2>
          <form onSubmit={shippingDetailsVerify}>
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
                <label htmlFor="shipping-phone">Contact Number (03000000000)</label>
                <input
                  type="tel"
                  className="form-control"
                  pattern="[0-9]{11}"
                  id="shipping-phone"
                  placeholder="03000000000"
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
