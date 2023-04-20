import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../store/Store";
import { filterPriceRangeProducts } from "../utils/utils";
const PriceRangeFilter = () => {
  let { products, dispatch, maxProductPrice, minProductPrice } =
    useContext(ProductsContext);
  const [rangePrice, setRangePrice] = useState(maxProductPrice);
  useEffect(() => {
    filterPriceRangeProducts(rangePrice, products, dispatch);
  }, [rangePrice]);
  return (
    <div className="container">
      <div className="price-range-filter">
        <div className="price-range">
          <label>{`Price: $${rangePrice}`}</label>
        </div>
        <div className="range-slider">
          <span className="min-price-range">${minProductPrice}</span>
          <input
            type="range"
            className="form-range"
            min={minProductPrice}
            max={maxProductPrice}
            value={rangePrice}
            step="any"
            onChange={(e) => {
              setRangePrice(e.target.value);
            }}
          />
          <span className="max-price-range">${maxProductPrice}</span>
          <input type="checkbox" name="" id="" />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
