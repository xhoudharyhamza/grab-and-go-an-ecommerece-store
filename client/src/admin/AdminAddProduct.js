import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../store/Store";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import { nullErrors } from "../utils/utils";
const AdminAddProduct = () => {
    let navigate= useNavigate()
  let { categories, error, dispatch } = useContext(ProductsContext);
  let [productDetails, setProductDetails] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    rate: "",
    price: "",
    category: "",
    count: "",
  });
  let changeEvent = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  let submitProduct = async (e) => {
    e.preventDefault();
    let { title, slug, price, description, category, image, rate, count } =
      productDetails;
    price = Number(price);
    rate = Number(rate);
    count = Number(count);
    let res = await fetch("/products", {
      method: "POST",
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
        rating: { rate, count },
      }),
    });
    let response = await res.json();
    if (res.status === 200) {
      let { product } = response;
      navigate('/admin/dashboard/products')
    } else {
      let { error } = response;
      dispatch({ type: "SET_ERROR", payload: { error } });
    }
  };
  useEffect(()=>{
    nullErrors(dispatch)
  },[])
  return (
    <div className="container">
      <div className="add-product">
        <div className="add-product-form">
          <h2>Add Product</h2>
          {error && <Error error={error} />}
          <form onSubmit={submitProduct}>
            <div className="form-group">
              <label htmlFor="add-product-title">Product Title</label>
              <input
                type="text"
                className="form-control add-product-title"
                id="add-product-title"
                placeholder="Product Title"
                required
                name="title"
                value={productDetails.title}
                onChange={changeEvent}
                // value={productDetails.title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-product-slug">Product Slug</label>
              <input
                type="text"
                className="form-control add-product-slug"
                id="add-product-slug"
                placeholder="Product Slug"
                required
                name="slug"
                onChange={changeEvent}
                value={productDetails.slug}
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-product-price">Product Price</label>
              <input
                type="number"
                className="form-control add-product-price"
                id="add-product-price"
                placeholder="Product price"
                required
                name="price"
                onChange={changeEvent}
                value={productDetails.price}
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-product-description">
                Product Description
              </label>
              <textarea
                type="text"
                className="form-control add-product-description"
                id="add-product-description"
                placeholder="Product Description"
                required
                name="description"
                onChange={changeEvent}
                value={productDetails.description}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="add-product-image-url">Product Image Url</label>
              <input
                type="text"
                className="form-control add-product-image-url"
                id="add-product-image-url"
                placeholder="Product Image Url"
                required
                name="image"
                onChange={changeEvent}
                value={productDetails.image}
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-product-rate">Product Rating</label>
              <input
                type="number"
                className="form-control add-product-rate"
                id="add-product-rate"
                placeholder="Product Rating"
                required
                name="rate"
                onChange={changeEvent}
                value={productDetails.rate}
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-product-product-rating-count">Product Ratings Count</label>
              <input
                type="number"
                className="form-control add-product-product-rating-count"
                id="add-product-product-rating-count"
                placeholder="Products Ratings Count"
                required
                name="count"
                onChange={changeEvent}
                value={productDetails.count}
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-product-category">Choose Category</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="category"
                onChange={changeEvent}
                value={productDetails.category}
                id="add-product-category"
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
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
