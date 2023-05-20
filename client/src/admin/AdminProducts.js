import React, { useContext, useEffect } from "react";
import { fetchProducts } from "../api/api";
import { ProductsContext } from "../store/Store";
import Loading from "../components/Loading";
import { deleteProduct } from "../api/api";
import { NavLink } from "react-router-dom";
import Error from "../components/Error";
import AdminFilterProducts from "./AdminFilterProducts";
import { nullErrors } from "../utils/utils";
const AdminProducts = () => {
  let { loading, products, dispatch, error } = useContext(ProductsContext);
  useEffect(() => {
    fetchProducts(dispatch);
    nullErrors(dispatch);
  }, []);
  return (
    <div className="container">
      <div className="admin-products">
        <div className="admin-products-body">
          {loading && <Loading />}
          <>
            <button className="btn btn-primary add-product-btn">
              <NavLink
                to="/admin/dashboard/products/add-product"
                className="add-product-link"
              >
                Add Product
              </NavLink>
            </button>
            <AdminFilterProducts />
            {error && <Error error={error} />}
            <div className="main-div">
              <div className="center-div">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Ratings</th>
                  <th scope="col">Rating Counts</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img src={product.image} alt="product Image" />
                        </td>
                        <td>{product.title}</td>
                        <td>{product.slug}</td>
                        <td>{product.category}</td>
                        <td>${product.price}</td>
                        <td>{product.rating.rate}</td>
                        <td>{product.rating.count}</td>
                        <td>
                          <NavLink
                            to={`/admin/dashboard/products/${product.slug}`}
                          >
                            <i className="fa-solid fa-pen-to-square edit-btn text-primary"></i>
                          </NavLink>
                          <i
                            className="fa-solid fa-trash delete-product-btn text-danger"
                            onClick={() => {
                              deleteProduct(
                                product._id,
                                fetchProducts,
                                dispatch
                              );
                            }}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
