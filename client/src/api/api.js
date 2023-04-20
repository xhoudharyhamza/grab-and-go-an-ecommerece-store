import { minProductPrice, maxProductPrice } from "../utils/utils";
//api call to fetch products
let fetchProducts = async (dispatch) => {
  dispatch({ type: "DATA_LOADING", payload: { loading: true } });
  let res = await fetch("/products");
  if (res.status === 200) {
    let { products } = await res.json();
    dispatch({ type: "SET_PRODUCTS", payload: { products } });
    dispatch({ type: "DATA_LOADING", payload: { loading: false } });
    dispatch({ type: "SET_RANGE_PRODUCTS", payload: { products } });
    maxProductPrice(products, dispatch);
    minProductPrice(products, dispatch);
  }
};
// api call to fetch top-rated products
let fetchTopRatedProducts = async (dispatch) => {
  dispatch({ type: "DATA_LOADING", payload: { loading: true } });
  let res = await fetch("/top-rated");
  if (res.status === 200) {
    let { products } = await res.json();
    dispatch({ type: "SET_TOP_RATED_PRODUCTS", payload: { products } });
    dispatch({ type: "DATA_LOADING", payload: { loading: false } });
  }
};
// api call to fetch new collections products
let fetchNewCollections = async (dispatch) => {
  dispatch({ type: "DATA_LOADING", payload: { loading: true } });
  let res = await fetch("/new-collections");
  if (res.status === 200) {
    let { products } = await res.json();

    dispatch({ type: "SET_NEW_COLLECTIONS_PRODUCTS", payload: { products } });
    dispatch({ type: "DATA_LOADING", payload: { loading: false } });
  }
};
// api call to fetch category products
let fetchCategoriesProducts = async (category, dispatch) => {
  dispatch({ type: "DATA_LOADING", payload: { loading: true } });
  let res = await fetch(`/products/categories/${category}`);
  let response = await res.json();
  if (res.status === 200) {
    let { products } = response;
    dispatch({ type: "SET_PRODUCTS", payload: { products } });
    dispatch({ type: "DATA_LOADING", payload: { loading: false } });
    dispatch({ type: "SET_RANGE_PRODUCTS", payload: { products } });
    maxProductPrice(products, dispatch);
    minProductPrice(products, dispatch);
  } else {
    let { error } = response;
    dispatch({ type: "SET_ERROR", payload: { error } });
    dispatch({ type: "DATA_LOADING", payload: { loading: false } });
  }
};
//api to call similar products
let fetchSimilarProducts = async (category, dispatch) => {
  let res = await fetch(`/products/categories/${category}`);
  let response = await res.json();
  if (res.status === 200) {
    let { products } = response;
    dispatch({ type: "SET_SIMILAR_PRODUCTS", payload: { products } });
  } else {
    let { error } = response;
    dispatch({ type: "SET_ERROR", payload: { error } });
    dispatch({ type: "DATA_LOADING", payload: { loading: false } });
  }
};
//api call to fetch product Details
let fetchSingleProduct = async (slug, dispatch) => {
  dispatch({ type: "DATA_LOADING", payload: { loading: true } });
  let res = await fetch(`/products/${slug}`);
  if (res.status === 200) {
    let { product } = await res.json();
    dispatch({ type: "SET_SINGLE_PRODUCTS", payload: { product } });
    dispatch({ type: "DATA_LOADING", payload: { loading: false } });
  }
};
// api call to fetch products categories
let fetchCategories = async (dispatch) => {
  dispatch({ type: "DATA_LOADING", payload: { loading: true } });
  let res = await fetch("/product/categories");
  if (res.status === 200) {
    let { categories } = await res.json();
    dispatch({ type: "SET_PRODUCTS_CATEGORIES", payload: { categories } });
    dispatch({ type: "DATA_LOADING", payload: { loading: false } });
  }
};
//authenticate user
let authenticateUser = async (dispatch) => {
  let res = await fetch("/authentication", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let { user } = await res.json();
  if (res.status === 200) {
    dispatch({ type: "SET_USER", payload: { user } });
  } else {
    dispatch({ type: "SET_USER", payload: { user } });
  }
};
let logoutUser = async (dispatch) => {
  let res = await fetch("/accounts/logout", {
    method: "GET",
    credentials: "include",
  });
  let response = await res.json();
  if (res.status === 200) {
    dispatch({ type: "SET_USER", payload: { user: response.user } });
  }
};
// api call to delete products category in admin panel
let deleteProductsCategory = async (_id, fetchCategories, dispatch) => {
  let confirm = window.confirm(
    "Are you sure you want to delete this category?"
  );
  if (confirm) {
    dispatch({ type: "DATA_LOADING", payload: { loading: true } });
    let res = await fetch(`/categories/${_id}`, {
      method: "DELETE",
    });
    let response = res.json();
    if (res.status === 200) {
      fetchCategories(dispatch);
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
    } else {
      let { error } = response;
      dispatch({ type: "SET_ERROR", payload: { error } });
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
    }
  }
};
// api call to delete product from admin panel
let deleteProduct = async (_id, fetchProducts, dispatch) => {
  let confirm = window.confirm(
    "Are you sure you want to delete this products?"
  );
  if (confirm) {
    let res = await fetch(`/products/${_id}`, {
      method: "DELETE",
    });
    let response = await res.json();
    if (res.status === 200) {
      fetchProducts(dispatch);
    } else {
      let { error } = response;
      dispatch({ type: "SET_ERROR", payload: { error } });
    }
  }
};
//api call to fetch product category details from admin panel
let fetchCategoryDetails = async (slug, setCategoryData, dispatch) => {
  let res = await fetch(`/categories/${slug}`);
  let response = await res.json();
  if (res.status === 200) {
    let { category } = response;
    setCategoryData({
      _id: category._id,
      title: category.title,
      slug: category.slug,
    });
  } else {
    let { error } = response;
    dispatch({ type: "SET_ERROR", payload: { error } });
  }
};
//api call to fetch all orders from admin panel
let fetchAllOrders = async (setOrders, dispatch) => {
  dispatch({ type: "DATA_LOADING", payload: { loading: true } });
  let res = await fetch("/orders", { method: "GET" });
  if (res.status === 200) {
    let { orders } = await res.json();
    setOrders(orders);
    dispatch({ type: "DATA_LOADING", payload: { loading: false } });
  } else {
    setOrders([]);
  }
};
//api call to fetch single product from admin panel
let fetchSingleProductAdmin = async (slug, dispatch, setProductDetails) => {
  let res = await fetch(`/products/${slug}`);
  let response = await res.json();
  if (res.status === 200) {
    let { product } = response;
    let {
      _id,
      title,
      slug,
      description,
      image,
      category,
      price,
      sizes,
      rating: { rate, count },
    } = product;
    if (!sizes) {
      sizes = "";
    } else {
      sizes = sizes.toString();
    }
    setProductDetails({
      _id,
      title,
      slug,
      description,
      image,
      sizes,
      category,
      price,
      rate,
      count,
    });
  } else {
    let { error } = response;
    dispatch({ type: "SET_ERROR", payload: { error } });
  }
};
//API call to fetch admin dashboard analytics
let fetchDashboardAnalytics = async (dispatch, setDashboardData) => {
  try {
    dispatch({ type: "DATA_LOADING", payload: { loading: true } });
    let res = await fetch("/admin/dashboard");
    let response = await res.json();
    if (res.status === 200) {
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      let analytics = response;
      setDashboardData({ ...analytics });
    } else {
      let { error } = response;
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      dispatch({ type: "SET_ERROR", payload: { error } });
    }
  } catch (error) {
    dispatch({ type: "DATA_LOADING", payload: { loading: false } });
    dispatch({ type: "SET_ERROR", payload: { error } });
  }
};
//API call to fetch orders of individual users
let fetchUserOrders = async (user, dispatch, setUserOrders) => {
  try {
    dispatch({ type: "DATA_LOADING", payload: { loading: true } });
    let res = await fetch(`/orders/user/${user.email}`);
    let response = await res.json();
    if (res.status === 200) {
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      let { orders } = response;
      setUserOrders(orders);
    } else {
      let { error } = response;
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      dispatch({ type: "SET_ERROR", payload: { error } });
    }
  } catch (error) {
    dispatch({ type: "DATA_LOADING", payload: { loading: false } });
    dispatch({ type: "SET_ERROR", payload: { error } });
  }
};
//API call to cancel order
let handelCancelOrder = async (_id, setUserOrders, dispatch) => {
  let confirm = window.confirm("Are You sure you want to cancel this order?");
  if (confirm) {
    try {
      dispatch({ type: "DATA_LOADING", payload: { loading: true } });
      let res = await fetch(`/orders/user/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: "cancel" }),
      });
      let response = await res.json();
      if (res.status === 200) {
        let { orders } = response;
        setUserOrders([...orders]);
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      } else {
        let { error } = response;
        dispatch({ type: "SET_ERROR", payload: { error } });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: { error } });
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
    }
  }
};
//API CALL to fetch order details
let fetchOrderDetails = async (_id, dispatch, setOrderDetails) => {
  try {
    dispatch({ type: "DATA_LOADING", payload: { loading: true } });
    let res = await fetch(`/orders/${_id}`);
    let response = await res.json();
    if (res.status === 200) {
      let { order } = response;
      let { userEmail, totalAmount, orderStatus, date } = order;
      setOrderDetails({
        userEmail,
        date,
        totalAmount,
        orderStatus,
        deliveryDate: "",
      });
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
    } else {
      let { error } = response;
      dispatch({ type: "SET_ERROR", payload: { error } });
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
    }
  } catch (error) {
    dispatch({ type: "SET_ERROR", payload: { error } });
    dispatch({ type: "DATA_LOADING", payload: { loading: false } });
  }
};
export {
  fetchProducts,
  fetchSingleProduct,
  fetchCategories,
  fetchTopRatedProducts,
  fetchCategoriesProducts,
  authenticateUser,
  logoutUser,
  fetchNewCollections,
  fetchSimilarProducts,
  fetchCategoryDetails,
  deleteProduct,
  deleteProductsCategory,
  fetchAllOrders,
  fetchSingleProductAdmin,
  fetchDashboardAnalytics,
  fetchUserOrders,
  handelCancelOrder,
  fetchOrderDetails,
};
