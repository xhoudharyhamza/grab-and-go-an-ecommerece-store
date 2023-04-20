import React, { createContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
let initialState = {
  products: [],
  rangeProducts: [],
  maxProductPrice: 0,
  minProductPrice: 0,
  singleProduct: null,
  cart: localStorage.getItem("shoppingCart")
    ? JSON.parse(localStorage.getItem("shoppingCart"))
    : [],
  categories: [],
  topRatedProducts: [],
  newCollections: [],
  similarProducts: [],
  user: null,
  loading: false,
  totalAmount: 0,
  error: null,
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : null,
};
let ProductsContext = createContext();
const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(state.cart));
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(state.shippingAddress)
    );
  }, [state.cart, state.shippingAddress]);
  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default Store;
export { ProductsContext };
