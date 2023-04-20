let express = require("express");
let router = express.Router();
const {
  fetchAllOrders,
  placeOrder,
  fetchUserOrders,
  adminDashboardData,
  updateUserOrder,
  fetchSearchResults,
  fetchLastMonthOrders,
  fetchOrderDetails,
  updateOrder
} = require("../controller/api");
//API to place order
router.post("/checkout/payment", placeOrder);
// API to fetch all orders
router.get("/orders", fetchAllOrders);
//API to fetch orders of a user
router.get("/orders/user/:email", fetchUserOrders)
//API call to update individual user orders
router.patch("/orders/user/:_id", updateUserOrder)
//API to fetch orders that made in last month
router.get('/order/lastmonth', fetchLastMonthOrders)
//API TO FETCH SEARCH RESULTS
router.get('/search', fetchSearchResults)
//APi to fetch a order
router.get('/orders/:_id', fetchOrderDetails)
//API to update order 
router.patch("/orders/:_id", updateOrder)
//API to fetch Data from different collections for admin panel
router.get("/admin/dashboard", adminDashboardData)
module.exports = router;
