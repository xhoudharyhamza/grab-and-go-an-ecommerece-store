import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ProductsContext } from "../store/Store";
import Error from "./Error";
import { nullErrors, loadingFalse } from "../utils/utils";
const Login = () => {
  let navigate = useNavigate();
  let url = useLocation();
  let { dispatch, error, user, loading } = useContext(ProductsContext);
  let [loginUser, setLoginUser] = useState({ email: "", password: "" });
  let changeHandler = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };
  let submitLoginForm = async (e) => {
    e.preventDefault();
    let { email, password } = loginUser;
    dispatch({ type: "DATA_LOADING", payload: { loading: true } });
    try {
      nullErrors(dispatch)
      let res = await fetch("/accounts/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      let response = await res.json();
      if (res.status === 200) {
        nullErrors(dispatch)
        dispatch({ type: "SET_USER", payload: { user: response.user } });
        loadingFalse(dispatch)
        if (url.pathname === "/checkout/accounts/login") {
          navigate("/checkout/shipping-address");
        } else {
          navigate("/products");
        }
      } else {
        loadingFalse(dispatch)
        dispatch({ type: "SET_ERROR", payload: { error: response.error } });
      }
    } catch (error) {
      loadingFalse(dispatch)
      dispatch({ type: "SET_ERROR", payload: { error } });
    }
  };
  useEffect(() => {
    nullErrors(dispatch)
    loadingFalse(dispatch)
  }, []);
  return (
    <div className="container">
      <div className="login-user">
        <div className="login-user-form">
          <h2>Login</h2>
          {error && <Error />}
          <form onSubmit={submitLoginForm}>
            <div className="form-group">
              <label htmlFor="user-email">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="user-email"
                placeholder="Enter Email"
                name="email"
                required
                value={loginUser.email}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="user-password">Enter password</label>
              <input
                type="password"
                className="form-control"
                id="user-password"
                placeholder="Enter Password"
                name="password"
                required
                value={loginUser.password}
                onChange={changeHandler}
              />
            </div>
            <button
              className="login-user-btn"
              type="submit"
              disabled={user || loading}
              style={user && { opacity: "0.5" }}
            >
              {loading
                ? "Processing..."
                : user
                  ? "Already Logged In"
                  : "Login Here"}
            </button>
          </form>
          <Link to={"/accounts/forgotpassword"} className="forgot-password-btn">Forgot Password?</Link>
          <p>New To Here?</p>
          <Link className="signup-user-btn" to={"/accounts/signup"}>
            SignUp Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
