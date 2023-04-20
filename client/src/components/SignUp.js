import React, { useContext, useState, useEffect } from "react";
import { Link} from "react-router-dom";
import Error from "./Error";
import { ProductsContext } from "../store/Store";
import { nullErrors } from "../utils/utils";
const SignUp = () => {
  let { dispatch, error, loading } = useContext(ProductsContext);
  let [signUpUser, setSignUpUser] = useState({ fname: "", lname: "", email: "", password: "", });
  let changeHandler = (e) => {
    setSignUpUser({
      ...signUpUser, [e.target.name]: e.target.value,
    });
  };
  let registerUser = async (e) => {
    e.preventDefault();
    let { fname, lname, email, password } = signUpUser;
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9a-z]).{8,16}$/;
    if (regex.test(email)) {
      if (regex.test(passwordRegex)) {
        try {
          dispatch({ type: "DATA_LOADING", payload: { loading: true } });
          let res = await fetch("/accounts/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fname, lname, email, password }),
          });
          let response = await res.json();
          if (res.status === 200) {
            let { message } = response;
            dispatch({ type: "DATA_LOADING", payload: { loading: false } });
            dispatch({ type: "SET_ERROR", payload: { error: message } });
            setSignUpUser({fname: "", lname: "", email: "",  password: "",
            })

          } else {
            let { error } = response;
            dispatch({ type: "DATA_LOADING", payload: { loading: false } });
            dispatch({ type: "SET_ERROR", payload: { error } });
          }
        } catch (error) {
          dispatch({ type: "DATA_LOADING", payload: { loading: false } });
          dispatch({ type: "SET_ERROR", payload: { error } });
        }
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: {
            error:
              "Password must be between 8 and 16 characters and include at least one uppercase letter and one special character",
          },
        });
      }
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: { error: "Please Enter valid Email" },
      });
    }
  };
  useEffect(() => {
    nullErrors(dispatch);
  }, []);
  return (
    <div className="container">
      <div className="signup-user">
        <div className="signup-user-form">
          <h1>SignUP</h1>
          {error && <Error />}
          <form onSubmit={registerUser}>
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first-name"
                placeholder="First Name"
                name="fname"
                required
                value={signUpUser.fname}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last-name"
                placeholder="Last Name"
                name="lname"
                required
                value={signUpUser.lname}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="user-email">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="user-email"
                placeholder="Enter Email"
                name="email"
                required
                value={signUpUser.email}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label for="user-password">Enter password</label>
              <input
                type="password"
                className="form-control"
                id="user-password"
                placeholder="Enter Password"
                name="password"
                required
                value={signUpUser.password}
                onChange={changeHandler}
              />
            </div>
            <button className="signup-user-btn" type="submit">
              {loading ? "Processing..." : "Signup Here"}
            </button>
          </form>
          <p>Already Have an Account?</p>
          <Link className="login-user-btn" to={"/accounts/login"}>
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
