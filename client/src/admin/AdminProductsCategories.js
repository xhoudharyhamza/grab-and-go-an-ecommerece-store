import React, { useContext, useEffect } from "react";
import { fetchCategories, errors, dispatch } from "../api/api";
import { ProductsContext } from "../store/Store";
import Loading from "../components/Loading";
import { NavLink } from "react-router-dom";
import { deleteProductsCategory } from "../api/api";
import { nullErrors } from "../utils/utils";
const AdminProductsCategories = () => {
  let { loading, categories, dispatch } = useContext(ProductsContext);
  useEffect(() => {
    fetchCategories(dispatch);
    nullErrors(dispatch);
  }, []);
  return (
    <div className="container">
      <div className="admin-products main-div">
        <div className="center-div">
          {loading ? (
            <Loading />
          ) : (
            <>
              <button className="btn btn-primary add-category-btn">
                <NavLink
                  to="/admin/dashboard/categories/add-category"
                  className="add-category-link"
                >
                  Add Category
                </NavLink>
              </button>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Slug</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => {
                    return (
                      <tr key={index}>
                        <td>{category.title}</td>
                        <td>{category.slug}</td>
                        <td>
                          <NavLink
                            to={`/admin/dashboard/categories/${category.slug}`}
                          >
                            <i className="fa-solid fa-pen-to-square edit-btn text-primary"></i>
                          </NavLink>
                          <i
                            className="fa-solid fa-trash delete-btn text-danger"
                            onClick={() => {
                              deleteProductsCategory(
                                category._id,
                                fetchCategories,
                                dispatch,
                              );
                            }}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductsCategories;
