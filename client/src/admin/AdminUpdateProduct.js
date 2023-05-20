import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsContext } from "../store/Store";
import Error from "../components/Error";
import { nullErrors } from "../utils/utils";
import { fetchSingleProductAdmin } from "../api/api";
const AdminUpdateProduct = () => {
  let params = useParams();
  let navigate = useNavigate();
  let { error, categories, dispatch } = useContext(ProductsContext);
  let [productDetails, setProductDetails] = useState({
    _id: "",
    title: "",
    slug: "",
    description: "",
    image: "",
    price: "",
    category: "",
    sizes: "",
    rate: "",
    count: "",
  });
  let changeEvent = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  let updateProduct = async (e) => {
    e.preventDefault();
    let {
      _id,
      title,
      slug,
      price,
      description,
      category,
      sizes,
      image,
      rate,
      count,
    } = productDetails;
    if (sizes == "") {
      sizes = [];
    } else {
      sizes = sizes.split(",");
    }
    price = Number(price);
    rate = Number(rate);
    count = Number(count);
    let res = await fetch(`/products/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        slug,
        price,
        description,
        category,
        image,
        sizes,
        rating: { rate, count },
      }),
    });
    let response = await res.json();
    if (res.status === 200) {
      let { product } = response;
      navigate("/admin/dashboard/products");
    } else {
      let { error } = response;
      dispatch({ type: "SET_ERROR", payload: { error } });
    }
  };
  useEffect(() => {
    fetchSingleProductAdmin(params.slug, dispatch, setProductDetails);
  }, [params.slug]);

  useEffect(() => {
    nullErrors(dispatch)
  }, [])
  return (
    <div className="container">
      <div className="update-product">
        <div className="update-product-form">
          <h2>Update Product</h2>
          {error && <Error error={error} />}
          <form onSubmit={updateProduct}>
            <div className="form-group">
              <label htmlFor="update-product-title">Product Title</label>
              <input
                type="text"
                className="form-control update-product-title"
                id="update-product-title"
                placeholder="Product Title"
                required
                name="title"
                value={productDetails.title}
                onChange={changeEvent}
              // value={productDetails.title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="update-product-slug">Product Slug</label>
              <input
                type="text"
                className="form-control update-product-slug"
                id="update-product-slug"
                placeholder="Product Slug"
                required
                name="slug"
                onChange={changeEvent}
                value={productDetails.slug}
              />
            </div>
            <div className="form-group">
              <label htmlFor="update-product-price">Product Price</label>
              <input
                type="number"
                className="form-control update-product-price"
                id="update-product-price"
                placeholder="Product price"
                required
                name="price"
                onChange={changeEvent}
                value={productDetails.price}
              />
            </div>
            <div className="form-group">
              <label htmlFor="update-product-description">
                Product Description
              </label>
              <textarea
                type="text"
                className="form-control update-product-description"
                id="update-product-description"
                placeholder="Product Description"
                required
                name="description"
                onChange={changeEvent}
                value={productDetails.description}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="update-product-sizes">Product Sizes</label>
              <input
                type="text"
                className="form-control update-product-sizes"
                id="update-product-sizes"
                placeholder="Product Sizes"
                name="sizes"
                onChange={changeEvent}
                value={productDetails.sizes}
              />
            </div>
            <div className="form-group">
              <label htmlFor="update-product-image-url">
                Product Image Url
              </label>
              <input
                type="text"
                className="form-control update-product-image-url"
                id="update-product-image-url"
                placeholder="Product Image Url"
                required
                name="image"
                onChange={changeEvent}
                value={productDetails.image}
              />
            </div>
            <div className="form-group">
              <label htmlFor="update-product-rate">Product Rating</label>
              <input
                type="number"
                className="form-control update-product-rate"
                id="update-product-rate"
                placeholder="Product Rating"
                required
                name="rate"
                onChange={changeEvent}
                value={productDetails.rate}
              />
            </div>
            <div className="form-group">
              <label htmlFor="update-product-product-ratings-count">
                Product Ratings Count
              </label>
              <input
                type="number"
                className="form-control update-product-product-ratings-count"
                id="update-product-product-ratings-count"
                placeholder="Product Ratings Count"
                required
                name="count"
                onChange={changeEvent}
                value={productDetails.count}
              />
            </div>
            <div className="form-group">
              <label htmlFor="update-product-category">Select Category</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="category"
                onChange={changeEvent}
                value={productDetails.category}
                id="update-product-category"
              >
                {categories &&
                  categories.map((category, index) => {
                    return (
                      <option value={category.slug} key={index}>
                        {category.title}
                      </option>
                    );
                  })}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateProduct;
