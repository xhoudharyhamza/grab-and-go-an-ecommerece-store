import React from "react";
import Products from "../components/Products";
import { Routes as Router, Route } from "react-router-dom";
import SingleProductDetails from "../components/SingleProductDetails";
import CategoryProducts from "../components/CategoryProducts";
import Cart from "../components/Cart";
import Home from "../components/Home";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import AdminDashboard from "../admin/AdminDashboard";
import UserProfile from "../components/UserProfile";
import CheckOut from "../components/CheckOut";
import ShippingAddress from "../components/ShippingAddress";
import ConfirmShipping from "../components/ConfirmShipping";
import AdminProducts from "../admin/AdminProducts";
import AdminProductsCategories from "../admin/AdminProductsCategories";
import AdminUsers from "../admin/AdminUsers";
import AdminUpdateProductCategory from "../admin/AdminUpdateProductCategory";
import AdminAddCategory from "../admin/AdminAddCategory";
import AdminAddProduct from "../admin/AdminAddProduct";
import AdminUpdateProduct from "../admin/AdminUpdateProduct";
import UpdateEmail from "../components/UpdateEmail";
import Dashboard from "../admin/Dashboard";
import UserOrders from "../components/UserOrders";
import AdminOrders from "../admin/AdminOrders";
import VerifyAccount from "../components/VerifyAccount";
import AdminUpdateUser from "../admin/AdminUpdateUser";
import SearchResults from "../components/SearchResults";
import AdminUpdateOrder from "../admin/AdminUpdateOrder";
const Routes = () => {
  return (
    <>
      <Router>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/accounts/login" element={<Login />} />
        <Route exact path="/accounts/signup" element={<SignUp />} />
        <Route path="/search" element={<SearchResults />} />
        <Route
          exact
          path="/accounts/verification/:token"
          element={<VerifyAccount />}
        />
        <Route exact path="/accounts/update-email" element={<UpdateEmail />} />
        <Route
          exact
          path="/products/:slug"
          element={<SingleProductDetails />}
        />
        <Route
          exact
          path="/categories/:category"
          element={<CategoryProducts />}
        />
        <Route exact path="/accounts/user-profile" element={<UserProfile />} />
        <Route exact path="/user/orders" element={<UserOrders />} />
        <Route exact path="/checkout" element={<CheckOut />}>
          <Route exact path="accounts/login" element={<Login />} />
          <Route
            exact
            path="shipping-address"
            element={<ShippingAddress />}
          ></Route>
          <Route
            exact
            path="confirm-shipping"
            element={<ConfirmShipping />}
          ></Route>
        </Route>
        <Route exact path="admin/dashboard" element={<AdminDashboard />}>
          <Route exact index element={<Dashboard />} />
          <Route exact path="products" element={<AdminProducts />} />
          <Route
            exact
            path="categories"
            element={<AdminProductsCategories />}
          />
          <Route exact path="orders" element={<AdminOrders />} />
          <Route exact path="orders/:_id" element={<AdminUpdateOrder />} />
          <Route exact path="accounts/users" element={<AdminUsers />} />
          <Route
            exact
            path="categories/:slug"
            element={<AdminUpdateProductCategory />}
          />
          <Route
            exact
            path="categories/add-category/"
            element={<AdminAddCategory />}
          />

          <Route
            exact
            path="products/add-product"
            element={<AdminAddProduct />}
          />
          <Route exact path="products/:slug" element={<AdminUpdateProduct />} />
          <Route
            exact
            path="accounts/users/:email"
            element={<AdminUpdateUser />}
          />
        </Route>
      </Router>
    </>
  );
};

export default Routes;
