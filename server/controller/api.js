let User = require("../models/userModel");
let Category = require("../models/categoryModel");
let Product = require("../models/productModel");
let Order = require("../models/ordersModel");
let UniqueToken = require("../models/tokenModel");
let { v4: uuidv4 } = require("uuid");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let { sendAuthenticationEMail, mailOptions } = require("./authEmail");
//api to fetch all registered users
let fetchAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
// api to add new product category
let addProductsCategory = async (req, res) => {
  try {
    let category = await new Category(req.body);
    await category.save();
    res.status(200).json({ category });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//api to delete category
let deleteProductsCategory = async (req, res) => {
  let _id = req.params._id;
  try {
    let category = await Category.findByIdAndDelete(_id);
    res.status(200).json({ category });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//api to fetch category details
let fetchCategoryDetails = async (req, res) => {
  let slug = req.params.slug;
  try {
    let category = await Category.findOne({ slug });
    res.status(200).json({ category });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};
//api to update category
let updateCategory = async (req, res) => {
  let _id = req.params._id;
  let { title, slug } = req.body;
  try {
    let category = await Category.updateOne(
      { _id },
      {
        $set: {
          title,
          slug,
        },
      }
    );
    res.status(200).json({ category });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//api to fetch category products
let fetchCategoryProducts = async (req, res) => {
  let category = req.params.category;
  try {
    let products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//api to delete product
let deleteProduct = async (req, res) => {
  let _id = req.params._id;
  try {
    let product = await Product.findByIdAndDelete(_id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//api to fetch single product
let fetchSingleProduct = async (req, res) => {
  let slug = req.params.slug;
  try {
    let product = await Product.findOne({ slug });
    res.status(200).json({ product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//api to update product
let updateSingleProduct = async (req, res) => {
  let _id = req.params._id;
  try {
    let updatedProduct = await Product.updateOne({ _id }, { $set: req.body });
    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//api to fetch all products
let getAllProducts = async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(404).json({ error });
  }
};
//api to add new product
let addNewProduct = async (req, res) => {
  try {
    let product = await new Product(req.body);
    await product.save();
    res.status(200).json({ product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//api to fetch top rated (highest ratings) products
let fetchTopRatedProducts = async (req, res) => {
  try {
    let products = await Product.find({ "rating.rate": { $gte: 4 } });

    res.status(200).json({ products });
  } catch (error) {
    res.status(404).json({ error });
  }
};
//api to fetch all categories
let fetchAllProductsCategories = async (req, res) => {
  try {
    let categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(404).json({ error });
  }
};
//api to logout users
let logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ user: null });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//api to update the email of registered user
let updateUserEmailAddress = async (req, res) => {
  let email = req.params.email;
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(404).json({ error: "Email is Already Registered" });
    } else {
      let updatedEmail = await User.updateOne(
        { email },
        { $set: { email: req.body.email } }
      );
      res.status(200).json({ user: updatedEmail });
    }
  } catch (error) {
    req.status(404).json({ error: error.message });
  }
};
//api to fetch latest products
let fetchNewCollections = async (req, res) => {
  try {
    let products = await Product.find({}).sort({ _id: -1 }).limit(8);
    res.status(200).json({ products });
  } catch (error) {
    res.status(404).json({ error: error.body });
  }
};
//api to fetch all orders
let fetchAllOrders = async (req, res) => {
  try {
    let orders = await Order.find({});
    res.status(200).json({ orders });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//api for live search in admin panel
let adminSearchProducts = async (req, res) => {
  let key = req.params.key;
  try {
    let products = await Product.find({
      $or: [
        { slug: { $regex: key, $options: "$i" } },
        { title: { $regex: key, $options: "$i" } },
        { amount: { $regex: key, $options: "$i" } },
        { category: { $regex: key, $options: "$i" } },
        { description: { $regex: key, $options: "$i" } },
      ],
    });
    if (products) {
      res.status(200).json({ products });
    } else {
      res.status(404).json({ error: "No Product found" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//api to signup user
let registerNewUsers = async (req, res) => {
  let { fname, lname, email, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(404).json({ error: "Email Already Registered" });
    } else {
      let token = await jwt.sign({ email }, process.env.SECRET_KEY);
      if (token) {
        let transporter = sendAuthenticationEMail();
        let subject = "Email Verification";
        let url = `<p>Click to the following link and verify you Email <a href='http://localhost:3000/accounts/verification/${token}'>http://localhost:3000/accounts/verification/${token}</a></p>`;
        let options = mailOptions(email, subject, url);
        let sendEmail = await transporter.sendMail(options);
        if (!sendEmail) {
          res.status(404).json({
            error: "Error in sending verification Email. Try again",
          });
        } else {
          let user = await new User({ fname, lname, email, password, token });
          user.password = await bcrypt.hash(user.password, 10);
          await user.save();
          res.status(200).json({
            message:
              "Verification email has sent to your email address. Click on the following url and verify you account",
          });
        }
      } else {
        res.status(404).json({ error: "Something went wrong try again" });
      }
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
let verifyingAccounts = async (req, res) => {
  let { token } = req.params;
  try {
    let unique = await User.findOne({ token });
    if (!unique) {
      res.status(404).json({ error: "Invalid Token" });
    } else {
      let updateUser = await User.updateOne(
        { email: unique.email },
        { $set: { isVerified: "true" } }
      );
      res.status(200).json({ message: "user is verified" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//api to login users
let loginUsers = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      let validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        if (user.isVerified === "true") {
          let token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY);
          res.cookie("jwt", token, { expire: 24 * 60 * 60, httpOnly: true });
          res.status(200).json({ user });
        } else {
          let unique = await User.findOne({ email });
          let token = unique.token;
          let transporter = sendAuthenticationEMail();
          let subject = "Email Verification";
          let url = `<p>Click to the following link and verify you Email <a href='http://localhost:3000/accounts/verification/${token}'>http://localhost:3000/accounts/verification/${token}</a></p>`;
          let options = mailOptions(email, subject, url);
          let sendEmail = await transporter.sendMail(options);
          if (sendEmail) {
            res.status(404).json({
              error:
                "Your Account is not verified. Check your email we have sent you a verification email again",
            });
          } else {
            res.status(404).json({
              error:
                "Your Account is not verified. Check your email we have sent you a verification email",
            });
          }
        }
      } else {
        res.status(404).json({ error: "Invalid Credentials!" });
      }
    } else {
      res.status(404).json({ error: "No User Found With This Email" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//api to place orders
let placeOrder = async (req, res) => {
  let { cart, user, shippingAddress, totalAmount, token } = req.body;
  try {
    let customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    let payment = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      let order = await new Order({
        name: user.fname + " " + user.lname,
        userEmail: user.email,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        products: cart,
        totalAmount,
        shippingAddress:
          shippingAddress.address +
          "," +
          shippingAddress.city +
          "," +
          " Pakistan",
        transactionId: payment.source.id,
      });
      await order.save();
      let transporter = sendAuthenticationEMail();
      let subject = "Order Confirmation";
      let url = `<p>Thanks For placing order. You order will deliver to your shipping address. You can track your order here<a href='http://localhost:3000/user/orders'>http://localhost:3000/user/orders</a></p>`;
      let options = mailOptions(order.userEmail, subject, url);
      let sendEmail = await transporter.sendMail(options);
      res.status(200).json({ payment: "successful" });
    } else {
      res.status(404).json({ error: "Something went wrong!" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
let fetchUserDetails = async (req, res) => {
  let { email } = req.params;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: "No User Found With this EMail" });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
//update user details
let updateUserDetails = async (req, res) => {
  let { email } = req.params;
  let user = req.body;
  try {
    let updateUser = await User.updateOne({ email }, { $set: { ...user } });
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};
let fetchUserOrders = async (req, res) => {
  let { email } = req.params;
  try {
    let orders = await Order.find({ userEmail: email });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
let adminDashboardData = async (req, res) => {
  try {
    let totalUsers = await User.find().count();
    let totalProducts = await Product.find().count();
    let totalCategories = await Category.find().count();
    let totalOrders = await Order.find().count();
    let canceledOrders = await Order.find({ orderStatus: "cancel" }).count();
    let deliveredOrders = await Order.find({
      orderStatus: "delivered",
    }).count();
    let orders = await Order.find({
      $or: [{ orderStatus: "pending" }, { orderStatus: "delivered" }],
    });
    let totalEarnings = orders.reduce((item, order) => {
      return item + order.totalAmount;
    }, 0);
    res.status(200).json({
      totalUsers,
      totalProducts,
      totalCategories,
      totalOrders,
      deliveredOrders,
      totalEarnings,
      canceledOrders,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//API to update order individual use order
let updateUserOrder = async (req, res) => {
  try {
    let { _id } = req.params;
    let updatedOrder = await Order.updateOne({ _id }, { $set: req.body });
    let orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//API to find search result
let fetchSearchResults = async (req, res) => {
  let { q } = req.query;
  try {
    const products = await Product.find({ $text: { $search: q } });
    res.status(200).json({ products });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//API to fetch last month orders
let fetchLastMonthOrders = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const orders = await Order.find({ date: { $gte: thirtyDaysAgo } });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//API controller to fetch order details
let fetchOrderDetails = async (req, res) => {
  let { _id } = req.params;
  try {
    let order = await Order.findOne({ _id });
    if (order) {
      res.status(200).json({ order });
    } else {
      res.status(404).json({ error: "No Order found against this ID" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//API controller to update order
let updateOrder = async (req, res) => {
  let { _id } = req.params;
  try {
    let order= await Order.findOne({_id})
    console.log(order)
    updatedOrder = await Order.updateOne({ _id }, { $set: {deliveryStatus:req.body.deliveryStatus, deliveryDate:req.body.deliveryDate} });
    console.log(updatedOrder);
    if (updatedOrder) {
      res.status(200).json({ message: "order is updated successfully" });
    } else {
      res
        .status(404)
        .json({ error: "Some Error! The Order is not updated try again" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  fetchAllUsers,
  addProductsCategory,
  deleteProductsCategory,
  fetchCategoryDetails,
  updateCategory,
  fetchCategoryProducts,
  deleteProduct,
  fetchSingleProduct,
  updateSingleProduct,
  getAllProducts,
  addNewProduct,
  fetchTopRatedProducts,
  fetchAllProductsCategories,
  logoutUser,
  updateUserEmailAddress,
  fetchNewCollections,
  fetchAllOrders,
  adminSearchProducts,
  registerNewUsers,
  loginUsers,
  placeOrder,
  verifyingAccounts,
  fetchUserDetails,
  updateUserDetails,
  fetchUserOrders,
  adminDashboardData,
  updateUserOrder,
  fetchSearchResults,
  fetchLastMonthOrders,
  fetchOrderDetails,
  updateOrder,
};
