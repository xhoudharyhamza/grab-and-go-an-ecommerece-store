import React, { useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import { ProductsContext } from "../store/Store";
import { useNavigate } from "react-router-dom";
const PayAmount = ({ totalAmount }) => {
  let navigate = useNavigate();
  let { shippingAddress, user, cart, dispatch, loading } =
    useContext(ProductsContext);
  let stripeKey="pk_test_51Mo2I9HwgwQZhZhCSbsfzaIvMRZBXAEdZGzFcPD73VNFIzGiAOWXCfuuJ9lB6vG1T6N0hkZ1PaCKgLJrNiMMTP7I00VuXs1BIQ"
  let tokenHandler = async (token) => {
    try {
      dispatch({ type: "DATA_LOADING", payload: { loading: true } });
      let res = await fetch("/checkout/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          totalAmount,
          cart,
          token,
          shippingAddress,
        }),
      });
      let response = await res.json();
      if (res.status === 200) {
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
        navigate("/user/orders");
        dispatch({ type: "SET_ERROR", payload: { error: null } });
      } else {
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
        let { error } = response;
        dispatch({ type: "SET_ERROR", payload: { error } });
      }
    } catch (error) {
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      dispatch({ type: "SET_ERROR", payload: { error } });
    }
  };
  return (
    <StripeCheckout
      token={tokenHandler}
      stripeKey={stripeKey}
      currency="USD"
      amount={totalAmount * 100}
      email={shippingAddress.email}
    >
      <button
        className="order-payment-btn btn btn-dark"
        // style={loading ?{ opacity:"0.5", }:""}
        disabled={loading}
      >
        {loading ? "Processing..." : `Pay $${totalAmount}`}
      </button>
    </StripeCheckout>
  );
};

export default PayAmount;
