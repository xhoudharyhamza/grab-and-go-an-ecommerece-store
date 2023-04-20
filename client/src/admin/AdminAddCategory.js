import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../store/Store";
import Error from "../components/Error";
import { nullErrors } from "../utils/utils";
const AdminAddCategory = () => {
  let navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({
    title: "",
    slug: "",
  });
  let { error, dispatch } = useContext(ProductsContext);
  let addNewProductCategory = async (e) => {
    e.preventDefault();
    let res = await fetch("/products/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: categoryData.title,
        slug: categoryData.slug,
      }),
    });
    let response = await res.json();
    if (res.status === 200) {
      navigate("/admin/dashboard/categories");
    } else {
      dispatch({ type: "SET_ERROR", payload: { error: response.error } });
    }
  };
  useEffect(() => {
    nullErrors(dispatch);
  }, []);
  return (
    <div className="container">
      <div className="add-category">
        <div className="add-category-form">
          <h2>Add Category</h2>
          {error && <Error error={error} />}
          <form onSubmit={addNewProductCategory}>
            <div class="form-group">
              <label for="add-category-title">Category Title</label>
              <input
                type="text"
                class="form-control add-category-title"
                id="add-category-title"
                placeholder="Category Title"
                name="title"
                value={categoryData.title}
                required
                onChange={(e) => {
                  setCategoryData({
                    ...categoryData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>
            <div class="form-group">
              <label for="update-category-slug">Category Slug</label>
              <input
                type="text"
                class="form-control add-category-slug"
                id="add-category-slug"
                placeholder="Category Slug"
                value={categoryData.slug}
                name="slug"
                required
                onChange={(e) => {
                  setCategoryData({
                    ...categoryData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCategory;
