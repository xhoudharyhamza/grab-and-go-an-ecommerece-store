import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  let [showAdminMenu, setShowAdminMenu] = useState(false);
  let activeStyle = {
    backgroundColor: "#FF0000",
    borderRadius: "5px",
  };
  return (
    <div className="admin-dashboard-menu">
      <li
        className="show-admin-menu"
        onClick={() => {
          setShowAdminMenu(!showAdminMenu);
        }}
      >
        <i className="fa-solid fa-bars"></i>
      </li>

      <nav
        className="admin-menu"
        style={showAdminMenu ? { display: "block" } : { display: "none" }}
      >
        <ul>
        <li
        className="close-admin-menu"
        onClick={() => {
          setShowAdminMenu(!showAdminMenu);
        }}
      >
       <i className="fa-solid fa-xmark"></i>
      </li>
          <li>
            <NavLink
              className="admin-nav-link"
              exact
              to=""
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className="admin-nav-link"
              to="products"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Products
            </NavLink>
          </li>
          <li className="has-subnav">
            <NavLink
              className="admin-nav-link"
              to="categories"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Categories
            </NavLink>
          </li>
          <li className="has-subnav">
            <NavLink
              className="admin-nav-link"
              to="accounts/users"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Users
            </NavLink>
          </li>
          <li className="has-subnav">
            <NavLink
              className="admin-nav-link"
              to="orders"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminMenu;
//style={({ isActive }) => (isActive ? activeStyle : undefined)}
