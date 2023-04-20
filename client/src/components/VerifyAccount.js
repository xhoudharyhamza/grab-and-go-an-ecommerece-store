import React, { useEffect, useContext, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ProductsContext } from "../store/Store";
import Error from "./Error";
const VerifyAccount = () => {
  let { dispatch, error, loading } = useContext(ProductsContext);
  let [verifyAccount, setVerifyAccount] = useState(false);
  let { token } = useParams();
  let verification = async () => {
    dispatch({ type: "DATA_LOADING", payload: { loading: true } });
    let res = await fetch(`/accounts/verification/${token}`);
    let response = await res.json();
    if (res.status === 200) {
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      setVerifyAccount(!verifyAccount);
    } else {
      let { error } = response;
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      dispatch({ type: "SET_ERROR", payload: { error } });
    }
  };
  useEffect(() => {
    verification();
  }, []);
  return (
    <div>
      {error && <Error error={error} />}
      {loading && (
        <p className="m-2" style={{ textAlign: "center" }}>
          Verifying...
        </p>
      )}
      {verifyAccount && (
        <div className="alert alert-success" role="alert">
          Your Account has been verified You can{" "}
          <NavLink to="/accounts/login" className="alert-link">
            Login Here!
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default VerifyAccount;
