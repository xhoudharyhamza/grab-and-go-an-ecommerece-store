import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ProductsContext } from "../store/Store";
import Error from "./Error";
import { nullErrors } from "../utils/utils";
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
      let res = await fetch("/accounts/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      let response = await res.json();
      if (res.status === 200) {
        dispatch({ type: "SET_ERROR", payload: { error: null } });
        dispatch({ type: "SET_USER", payload: { user: response.user } });
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
        if (url.pathname === "/checkout/accounts/login") {
          navigate("/checkout/shipping-address");
        } else {
          navigate("/products");
        }
      } else {
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
        dispatch({ type: "SET_ERROR", payload: { error: response.error } });
      }
    } catch (error) {
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      dispatch({ type: "SET_ERROR", payload: { error } });
    }
  };
  useEffect(() => {
    nullErrors(dispatch)
  }, []);
  return (
    <div className="container">
      <div className="login-user">
        <div className="login-user-form">
          <h1>Login</h1>
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
