let mongoose = require("mongoose");
let orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  products: {
    type: [],
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    require: true,
  },
  orderStatus: {
    type: String,
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
  },
});
let Order = mongoose.model("Order", orderSchema);
module.exports = Order;
