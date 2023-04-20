import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductsContext } from "../store/Store";
import Error from "../components/Error";
import { fetchCategoryDetails } from "../api/api";
import { nullErrors } from "../utils/utils";
const AdminUpdateProductCategory = () => {
  let params = useParams();
  let navigate = useNavigate();
  let { error, dispatch } = useContext(ProductsContext);
  const [categoryData, setCategoryData] = useState({
    _id: "",
    title: "",
    slug: "",
  });
  let updateCategory = async (e) => {
    e.preventDefault();
    let res = await fetch(`/categories/${categoryData._id}`, {
      method: "PATCH",
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
      let { error } = response;
      dispatch({ type: "SET_ERROR", payload: { error } });
    }
  };
  useEffect(() => {
    fetchCategoryDetails(params.slug, setCategoryData, dispatch);
  }, [params.slug]);
  
  useEffect(()=>{
    nullErrors(dispatch)
  },[])
  return (
    <div className="container">
      <div className="update-category">
        <div className="update-category-form">
          <h2>Update Category</h2>
          {error ? (
            <Error error={error} />
          ) : (
            <form onSubmit={updateCategory}>
              <div className="form-group">
                <label htmlFor="update-category-title">Category Title</label>
                <input
                  type="text"
                  className="form-control update-category-title"
                  id="update-category-title"
                  placeholder="Category Title"
                  required
                  value={categoryData.title}
                  onChange={(e) => {
                    setCategoryData({ ...categoryData, title: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="update-category-slug">Category Slug</label>
                <input
                  type="text"
                  className="form-control update-category-slug"
                  id="update-category-slug"
                  placeholder="Category Slug"
                  required
                  value={categoryData.slug}
                  onChange={(e) => {
                    setCategoryData({ ...categoryData, slug: e.target.value });
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Category
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateProductCategory;
