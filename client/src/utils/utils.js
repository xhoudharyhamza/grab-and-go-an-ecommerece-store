//defining function to find maximum product price
let maxProductPrice = (products, dispatch) => {
  let maxValue = 0;

  for (let i = 0; i < products.length; i++) {
    if (products[i].price > maxValue) {
      maxValue = products[i].price;
    }
  }
  dispatch({ type: "SET_MAXIMUM_PRODUCT_PRICE", payload: { price: maxValue } });
};
let minProductPrice = (products, dispatch) => {
  let minValue = 100000000;

  for (let i = 0; i < products.length; i++) {
    if (products[i].price < minValue) {
      minValue = products[i].price;
    }
  }
  dispatch({ type: "SET_MINIMUM_PRODUCT_PRICE", payload: { price: minValue } });
};
//add product to shopping cart
let addProductToCart = (id, dispatch, size) => {
  dispatch({ type: "ADD_PRODUCT_TO_CART", payload: { id } });
};
//remove product from shopping car
let removeProductFromCart = (id, dispatch) => {
  dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: { id } });
};
//increment decrement cart product quantity
let changeProductQuantity = (quantity, id, dispatch) => {
  if (quantity === "increment") {
    dispatch({ type: "INCREMENT_QUANTITY", payload: { id } });
  } else {
    dispatch({ type: "DECREMENT_QUANTITY", payload: { id } });
  }
};
//calculate totalAmount
let calculateTotalAmount = (dispatch, cart) => {
  let totalAmount = cart.reduce((total, product) => {
    return Math.round(total + product.quantity * product.price);
  }, 0);
  dispatch({ type: "SET_TOTAL_AMOUNT", payload: { totalAmount } });
};
//arrange products in ascending order
let ascendingOrderProducts = (products, dispatch) => {
  dispatch({ type: "DATA_LOADING", payload: { loading: true } });
  let arrangedProducts = products.sort((a, b) => {
    return a.price - b.price;
  });
  dispatch({
    type: "SET_RANGE_PRODUCTS",
    payload: { products: arrangedProducts },
  });
  dispatch({ type: "DATA_LOADING", payload: { loading: false } });
};
let descendingOrderProducts = (products, dispatch) => {
  dispatch({ type: "DATA_LOADING", payload: { loading: true } });
  let arrangedProducts = products.sort((a, b) => {
    return b.price - a.price;
  });
  dispatch({
    type: "SET_RANGE_PRODUCTS",
    payload: { products: arrangedProducts },
  });
  dispatch({ type: "DATA_LOADING", payload: { loading: false } });
};
//price range filter products
let filterPriceRangeProducts = (price, products, dispatch) => {
  dispatch({ type: "DATA_LOADING", payload: { loading: true } });
  let filterProducts = products.filter((product) => {
    return product.price <= price;
  });
  dispatch({
    type: "SET_RANGE_PRODUCTS",
    payload: { products: filterProducts },
  });
  dispatch({ type: "DATA_LOADING", payload: { loading: false } });
};
//call api to fetch all users in admin panel
let fetchAllUsers = async (setUser, dispatch) => {
  dispatch({ type: "DATA_LOADING", payload: { loading: true } });
  let res = await fetch("/accounts", { method: "GET" });
  if (res.status === 200) {
    let { users } = await res.json();
    setUser(users);
    dispatch({ type: "DATA_LOADING", payload: { loading: false } });
  } else {
    setUser([]);
  }
};
//set all error to null
let nullErrors = (dispatch) => {
  dispatch({ type: "SET_ERROR", payload: { error: null } });
};
//category products filter
let categoryProductsFilter = (products, dispatch, filterCategories) => {
  dispatch({ type: "DATA_LOADING", payload: { loading: true } });
  let filteredProducts = products.filter((product) => {
    return filterCategories.includes(product.category);
  });
  maxProductPrice(filteredProducts, dispatch);
  minProductPrice(filteredProducts, dispatch);
  dispatch({ type: "DATA_LOADING", payload: { loading: false } });
  dispatch({
    type: "SET_RANGE_PRODUCTS",
    payload: { products: filteredProducts },
  });
};
export {
  maxProductPrice,
  minProductPrice,
  removeProductFromCart,
  addProductToCart,
  changeProductQuantity,
  calculateTotalAmount,
  ascendingOrderProducts,
  descendingOrderProducts,
  filterPriceRangeProducts,
  fetchAllUsers,
  nullErrors,
  categoryProductsFilter,
};
