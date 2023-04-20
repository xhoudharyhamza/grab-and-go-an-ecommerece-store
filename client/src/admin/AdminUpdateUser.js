import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductsContext } from "../store/Store";
import { nullErrors } from "../utils/utils";
import Loading from "../components/Loading";
import Error from "../components/Error";
const AdminUpdateUser = () => {
  let { email } = useParams();
  let navigate = useNavigate();
  let { error, loading, dispatch } = useContext(ProductsContext);
  let [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    isAdmin: "",
    isVerified: "",
  });
  let changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  let fetchUserDetails = async () => {
    try {
      dispatch({ type: "DATA_LOADING", payload: { loading: true } });
      let res = await fetch(`/accounts/users/${email}`);
      let response = await res.json();
      if (res.status === 200) {
        let { user } = response;
        setUserData({ ...user });
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      } else {
        let { error } = response;
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
        dispatch({ type: "SET_ERROR", payload: { error } });
      }
    } catch (error) {
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      dispatch({ type: "SET_ERROR", payload: { error: error.message } });
    }
  };
  let updateUserData = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "DATA_LOADING", payload: { loading: true } });
      let res = await fetch(`/accounts/users/${email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      let response = await res.json();
      if (res.status === 200) {
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
        navigate("/admin/dashboard/users");
      } else {
        let { error } = response;
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
        dispatch({ type: "SET_ERROR", payload: { error } });
      }
    } catch (error) {
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      dispatch({ type: "SET_ERROR", payload: { error } });
    }
  };
  useEffect(() => {
    fetchUserDetails();
    nullErrors(dispatch);
  }, []);
  return (
    <div className="container">
      {loading && <Loading />}
      {error ? (
        <Error error={error} />
      ) : (
        <div className="update-user">
          <div className="update-user-form">
            <h2>Update User</h2>
            <form onSubmit={updateUserData}>
              <div className="form-group">
                <label htmlFor="update-user-name">User Name</label>
                <input
                  type="text"
                  className="form-control update-product-title"
                  id="update-user-name"
                  placeholder="Full Name"
                  required
                  name="name"
                  readOnly
                  value={`${userData.fname} ${userData.lname}`}
                />
              </div>
              <div className="form-group">
                <label htmlFor="update-user-email">User Email</label>
                <input
                  type="email"
                  className="form-control update-user-email"
                  id="update-user-email"
                  placeholder="User Email"
                  required
                  name="email"
                  readOnly
                  value={userData.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="update-user-password">User Hash Password</label>
                <input
                  type="text"
                  className="form-control update-user-password"
                  id="update-user-password"
                  placeholder="Hash Password"
                  required
                  readOnly
                  name="password"
                  value={userData.password}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">isAdmin</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isAdmin"
                    value="true"
                    id="admin-role"
                    checked={userData.isAdmin === "true"}
                    onChange={changeHandler}
                  />
                  <label className="form-check-label" for="admin-role">
                    True
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isAdmin"
                    value="false"
                    onChange={changeHandler}
                    checked={userData.isAdmin === "false"}
                    id="user-role"
                  />
                  <label className="form-check-label" for="user-role">
                    False
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="status">isVerified</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isVerified"
                    id="verified"
                    onChange={changeHandler}
                    value="true"
                    checked={userData.isVerified === "true"}
                  />
                  <label className="form-check-label" htmlFor="verified">
                    True
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isVerified"
                    id="unverified"
                    value="false"
                    checked={userData.isVerified === "false"}
                    onChange={changeHandler}
                  />
                  <label className="form-check-label" HTMLFor="unverified">
                    False
                  </label>
                </div>
              </div>
              <button type="submit" disabled={loading}>{loading? "Processing..." :"Update User"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUpdateUser;
