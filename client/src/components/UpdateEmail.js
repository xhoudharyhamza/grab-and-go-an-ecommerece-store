import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../store/Store";
import Error from "./Error"
import { useNavigate } from "react-router-dom";
import {logoutUser} from'../api/api'
const UpdateEmail = () => {
  let navigate = useNavigate();
  let { user,error, dispatch } = useContext(ProductsContext);
  let [userEmail, setUserEmail] = useState("");
  let updateEmailAddress = async (e) => {
    e.preventDefault();
    let res = await fetch(`/accounts/update-email/${user.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    });
    let response = await res.json();
    if (res.status === 200) {
      let { user } = response;
      logoutUser(dispatch)
      navigate("/accounts/login");
    } else {
      let { error } = response;
      dispatch({ type: "SET_ERROR", payload: { error } });
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/accounts/login");
    }
    dispatch({type:"SET_ERROR", payload:{error:null}})
  }, [user]);
  return (
    <>
      {user && (
        <div className="container">
          <div className="user-update-email">
            <div className="user-update-email-form">
              <h2>Update Email</h2>
              {error&&<Error error={error}/>}
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
                <button className="update-user-email-btn" type="submit">
                  Update Email
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateEmail;
