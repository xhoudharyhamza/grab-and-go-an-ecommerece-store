import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../store/Store";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/api";
import { nullErrors } from "../utils/utils";
import Loading from "./Loading";
const UpdateEmail = () => {
  let navigate = useNavigate();
  let { user, error, dispatch, loading } = useContext(ProductsContext);
  let [userEmail, setUserEmail] = useState("");
  let [showUpdateEmailForm, setShowUpdateEmailForm] = useState(false);
  let [otp, setOtp] = useState("");
  let sendOtp = async () => {
    dispatch({ type: "DATA_LOADING", payload: { loading: true } });
    let res = await fetch(`/accounts/update-email/${user.email}`);
    let response = await res.json();
    dispatch({ type: "DATA_LOADING", payload: { loading: false } });
    if (!res.status === 200) {
      let { error } = response;
      dispatch({ type: "SET_ERROR", payload: { error } });
    }
  };
  let verifyOtp = async (e) => {
    e.preventDefault();
    if (otp == user.otp) {
      setShowUpdateEmailForm(true);
      nullErrors();
    } else {
      setShowUpdateEmailForm(false);
      dispatch({
        type: "SET_ERROR",
        payload: { error: "The Entered OTP is not Matched" },
      });
    }
  };
  let updateEmailAddress = async (e) => {
    e.preventDefault();
    dispatch({ type: "DATA_LOADING", payload: { loading: true } });
    let res = await fetch(`/accounts/update-email/${user.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    });
    let response = await res.json();
    if (res.status === 200) {
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      logoutUser(dispatch);
      navigate("/accounts/login");
    } else {
      let { error } = response;
      dispatch({ type: "SET_ERROR", payload: { error } });
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/accounts/login");
    } else {
      sendOtp();
    }
    nullErrors(dispatch);
  }, [user]);
  return (
    <>
      {user && (
        <div className="container">
          <div className="user-update-email">
            <div className="user-update-email-form">
              {error && <Error error={error} />}
              {showUpdateEmailForm ? (
                <>
                  <h2>Update Email</h2>
                  <form onSubmit={updateEmailAddress}>
                    <div className="form-group">
                      <label htmlFor="user-email">Current Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="user-email"
                        aria-describedby="emailHelp"
                        value={user.email}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="user-new-email">Enter New Email</label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        id="user-new-email"
                        placeholder="Enter New Email Address"
                        aria-describedby="emailHelp"
                        value={userEmail}
                        onChange={(e) => {
                          setUserEmail(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      className="update-user-email-btn"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Processing" : "Update Email"}
                    </button>
                  </form>
                </>
              ) : loading ? (
                <Loading />
              ) : (
                <>
                  <h2>Verify OTP</h2>
                  <p>
                    An OTP is send to your Email to update Email write OTP
                    Below.
                  </p>
                  <form onSubmit={verifyOtp}>
                    <div className="form-group">
                      <label htmlFor="user-otp">Enter OTP</label>
                      <input
                        type="numeric"
                        className="form-control"
                        id="user-otp"
                        placeholder="Enter OTP"
                        aria-describedby="otpHelp"
                        required
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value);
                        }}
                      />
                    </div>
                    <button className="verify-otp-btn" type="submit">
                      Verify OTP
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateEmail;
