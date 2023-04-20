import React, { useContext, useEffect, useState } from "react";
import ProductsCategoriesFilter from "./ProductsCategoriesFilter";
import ArrangeProductsFilter from "./ArrangeProductsFilter";
import PriceRangeFilter from "./PriceRangeFilter";
const FilterProducts = () => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="container">
      <div className="filter-products">
        <button
          className="show-filters"
          onClick={() => {
            setShowFilters(!showFilters);
          }}
        >
          <i className="fa-solid fa-sliders"></i>
          Filter Products
        </button>
        {showFilters && (
          <div className="product-filters">
            <ArrangeProductsFilter />
            <PriceRangeFilter />
            <ProductsCategoriesFilter />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterProducts;
