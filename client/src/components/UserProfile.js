import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductsContext } from "../store/Store";
const UserProfile = () => {
  let { user } = useContext(ProductsContext);
  let navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/accounts/login");
    }
  }, [user]);
  return (
    <>
      {user && (
        <div className="container">
          <div className="login-user-profile">
            <div className="user-profile">
              <div className="profile-image">
                <img src="/images/profile.png" alt="profile" />
              </div>
              <div className="form-group">
                <label htmlFor="user-name">Full Name</label>
                <input
                  type="name"
                  className="form-control"
                  id="user-name"
                  value={`${user.fname} ${user.lname}`}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="user-email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="user-email"
                  aria-describedby="emailHelp"
                  value={user.email}
                  disabled
                />
                <Link className="update-user-email" to={"/accounts/update-email"}>Change Email Address</Link>
              </div>
              <div className="form-group">
                <label htmlFor="user-password">Hash Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="user-password"
                  value={user.password}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="user-password">Role</label>
                <input
                  type="text"
                  className="form-control"
                  id="user-password"
                  value={user.isAdmin === "true" ? "Admin" : "User"}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
