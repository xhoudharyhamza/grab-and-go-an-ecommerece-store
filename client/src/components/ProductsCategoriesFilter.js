import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../store/Store";
import { maxProductPrice, minProductPrice } from "../utils/utils";
import { categoryProductsFilter } from "../utils/utils";
const ProductsCategoriesFilter = () => {
  let { categories, products, dispatch, rangeProducts } =
    useContext(ProductsContext);
  let [filterCategories, setFilterCategories] = useState([]);
  let checkboxHandler = (e) => {
    let value = e.target.value;
    let checked = e.target.checked;
    if (checked) {
      setFilterCategories([...filterCategories, value]);
    } else {
      setFilterCategories(
        filterCategories.filter((category) => {
          return value !== category;
        })
      );
    }
  };
  useEffect(() => {
    filterCategories.length === 0
      ? dispatch({ type: "SET_RANGE_PRODUCTS", payload: { products } })
      : categoryProductsFilter(products, dispatch, filterCategories);
  }, [filterCategories]);
  return (
    <div className="products-categories-filter">
      {categories.map((category, index) => {
        return (
          <div key={index}>
            <label htmlFor="">
              <input
                type="checkbox"
                label={category.title}
                value={category.slug}
                onChange={checkboxHandler}
              />
              {category.title}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsCategoriesFilter;
