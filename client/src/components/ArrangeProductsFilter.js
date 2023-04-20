import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../store/Store";
import {
  ascendingOrderProducts,
  descendingOrderProducts,
} from "../utils/utils";
const ArrangeProductsFilter = () => {
  const [productsOrder, setProductsOrder] = useState(null);
  let { rangeProducts, dispatch } = useContext(ProductsContext);
  useEffect(() => {
    if (productsOrder === "ascending") {
      ascendingOrderProducts(rangeProducts, dispatch);
    } else if (productsOrder === "descending") {
      descendingOrderProducts(rangeProducts, dispatch);
    }
  }, [productsOrder]);
  return (
    <div className="arrange-products-filter">
      <div className="form-check ascending-order">
        <input
          className="form-check-input"
          type="radio"
          name="order-of-products"
          id="ascending-order"
          checked={productsOrder === "ascending"}
          value="ascending"
          onChange={() => {
            setProductsOrder("ascending");
          }}
        />
        <label className="form-check-label" htmlFor="ascending-order">
          Ascending Order
        </label>
      </div>
      <div className="form-check descending-order">
        <input
          className="form-check-input"
          type="radio"
          name="order-of-products"
          id="descending-order"
          checked={productsOrder === "descending"}
          value="descending"
          onChange={() => {
            setProductsOrder("descending");
          }}
        />
        <label className="form-check-label" htmlFor="descending-order">
          Descending Order
        </label>
      </div>
    </div>
  );
};

export default ArrangeProductsFilter;
