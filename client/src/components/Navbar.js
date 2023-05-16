import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { fetchCategories, authenticateUser, logoutUser } from "../api/api";
import { ProductsContext } from "../store/Store";
const Navbar = () => {
  let { cart, categories, user, dispatch } = useContext(ProductsContext);
  let activeStyle = {
    backgroundColor: "#9e5a9e",
    borderRadius: "5px",
    transition: "0.3s ease",
    padding: "5px 10px",
  };
  useEffect(() => {
    fetchCategories(dispatch);
    authenticateUser(dispatch);
  }, []);
  return (
    <nav className="nav-bar">
      <div className="logo">Grab&Go</div>
      <ul className="nav-links">
        <input type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" className="hamburger">
          &#9776;
        </label>

        <div className="menu">
          <li>
            <NavLink
              className="menu-link"
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="menu-link"
              to="/products"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Products
            </NavLink>
          </li>
          <li className="menu-link categories">
            <a>
              Categories <i className="fa-solid fa-caret-down"></i>
            </a>
            <ul className="dropdown">
              {categories &&
                categories.map((category, index) => {
                  return (
                    <li key={index}>
                      <NavLink
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                        className="menu-link"
                        to={`/categories/${category.slug}`}
                      >
                        {category.title}
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
          </li>
          <li>
            <NavLink
              className="menu-link"
              to="/cart"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span className=" badge bg-secondary">{cart.length}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="menu-link"
              to="/contact"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Contact
            </NavLink>
          </li>
          {!user ? (
            <li>
              <NavLink
                className="menu-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                to={"/accounts/login"}
              >
                Login
              </NavLink>
            </li>
          ) : (
            user && (
              <li className="menu-link categories">
                <a>
                  {user.email} <i className="fa-solid fa-caret-down"></i>
                </a>
                <ul className="dropdown">
                  <li>
                    <NavLink
                      className="menu-link"
                      to={"/accounts/user-profile"}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="menu-link" to={"/user/orders"}>
                      Orders
                    </NavLink>
                  </li>
                  <li
                    onClick={() => {
                      logoutUser(dispatch);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <a className="menu-link">LogOut</a>
                  </li>
                  {user.isAdmin == "true" && (
                    <li>
                      <NavLink className="menu-link" to={"/admin/dashboard"}>
                        Admin Dashboard
                      </NavLink>
                    </li>
                  )}
                </ul>
              </li>
            )
          )}
        </div>
      </ul>
    </nav>
    // <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
    //   <div className="container-fluid">
    //     <NavLink className="navbar-brand" to="/">
    //       SCU Store
    //     </NavLink>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarSupportedContent"
    //       aria-controls="navbarSupportedContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <NavLink
    //             className="nav-link"
    //             aria-current="page"
    //             to="/"
    //             style={({ isActive }) => (isActive ? activeStyle : undefined)}
    //           >
    //             Home
    //           </NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink
    //             className="nav-link"
    //             to="/products"
    //             style={({ isActive }) => (isActive ? activeStyle : undefined)}
    //           >
    //             Products
    //           </NavLink>
    //         </li>
    //         <li className="nav-item dropdown">
    //           <a
    //             className="nav-link dropdown-toggle"
    //             href="#"
    //             role="button"
    //             data-bs-toggle="dropdown"
    //             aria-expanded="false"
    //           >
    //             Categories
    //           </a>
    //           <ul className="dropdown-menu">
    //             {categories &&
    //               categories.map((category, index) => {
    //                 return (
    //                   <li key={index}>
    //                     <NavLink
    //                       style={({ isActive }) =>
    //                         isActive ? activeStyle : undefined
    //                       }
    //                       className="dropdown-item"
    //                       to={`/categories/${category.slug}`}
    //                     >
    //                       {category.title}
    //                     </NavLink>
    //                   </li>
    //                 );
    //               })}
    //           </ul>
    //         </li>
    //         {!user ? (
    //           <li className="nav-item">
    //             <NavLink
    //               className="nav-link"
    //               style={({ isActive }) => (isActive ? activeStyle : undefined)}
    //               to={"/accounts/login"}
    //             >
    //               Login
    //             </NavLink>
    //           </li>
    //         ) : (
    //           user && (
    //             <li className="nav-item dropdown">
    //               <a
    //                 className="nav-link dropdown-toggle"
    //                 href="#"
    //                 role="button"
    //                 data-bs-toggle="dropdown"
    //                 aria-expanded="false"
    //               >
    //                 {user.email}
    //               </a>
    //               <ul className="dropdown-menu">
    //                 <li>
    //                   <NavLink
    //                     className="dropdown-item"
    //                     to={"/accounts/user-profile"}
    //                   >
    //                     User Profile
    //                   </NavLink>
    //                 </li>
    //                 {user.isAdmin == "true" && (
    //                   <li>
    //                     <NavLink
    //                       className="dropdown-item"
    //                       to={"/admin/dashboard"}
    //                     >
    //                       Admin Dashboard
    //                     </NavLink>
    //                   </li>
    //                 )}

    //                 <li
    //                   onClick={() => {
    //                     logoutUser(dispatch);
    //                   }}
    //                   style={{ cursor: "pointer" }}
    //                 >
    //                   <a className="dropdown-item">LogOut</a>
    //                 </li>
    //               </ul>
    //             </li>
    //           )
    //         )}

    //         <li className="nav-item">
    //           <NavLink
    //             className="nav-link"
    //             to="/cart"
    //             style={({ isActive }) => (isActive ? activeStyle : undefined)}
    //           >
    //             <i className="fa-solid fa-cart-shopping"></i>
    //             <span className=" badge bg-secondary">{cart.length}</span>
    //           </NavLink>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;
