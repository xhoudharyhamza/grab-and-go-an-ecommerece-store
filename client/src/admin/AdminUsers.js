import React, { useEffect, useState, useContext } from "react";
import { fetchAllUsers, nullErrors } from "../utils/utils";
import { ProductsContext } from "../store/Store";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
const AdminUsers = () => {
  let { loading, dispatch } = useContext(ProductsContext);
  let [users, setUsers] = useState([]);
  useEffect(() => {
    fetchAllUsers(setUsers, dispatch);
    nullErrors(dispatch)
  }, []);
  return (
    <div className="container">
      <div className="admin-users main-div">
        <div className="center-div">
          {loading ? (
            <Loading />
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Role</th>
                  <th scope="col">isVerified</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {user.fname} {user.lname}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.isAdmin === "true" ? <span className="badge text-bg-primary">Admin</span> : <span className="badge text-bg-secondary">User</span>}</td>
                      <td>
                        {user.isVerified === "true" ? <span className="badge text-bg-success">Verified</span> : <span className="badge text-bg-danger">Pending</span>}
                      </td>
                      <td>
                        <Link to={`/admin/dashboard/accounts/users/${user.email}`}>
                        <i className="fa-solid fa-pen-to-square edit-btn text-primary"></i></Link>
                        {/* <i className="fa-solid fa-trash delete-btn text-danger"></i> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
