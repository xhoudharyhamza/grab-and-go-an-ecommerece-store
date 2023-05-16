import React, { useEffect, useContext } from "react";
import AdminMenu from "./AdminMenu";
import "./styles/admin.css";
import { ProductsContext } from "../store/Store";
import { Outlet, useNavigate } from "react-router-dom";
import { nullErrors } from "../utils/utils";
const AdminDashboard = () => {
  let navigate = useNavigate();
  let { user,dispatch } = useContext(ProductsContext);
  useEffect(() => {
    if (user) {
      if(user.isAdmin!=="true"){
        navigate("/");
      }
    } else if (!user) {
      navigate("/accounts/login");
    }
  }, [user]);
  
  useEffect(()=>{
    nullErrors(dispatch)
  },[])
  return (
    <div className="admin-dashboard ">
      <div className="admin-dashboard-components  container">
      <AdminMenu />
      <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
