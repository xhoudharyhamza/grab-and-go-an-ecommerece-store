let express = require("express");
let app = express();
require("dotenv").config();
require("./database/connection");
let cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
let routes = require("./routes/routes");
let productRoutes = require("./routes/productsRoutes");
let categoriesRoutes = require("./routes/categoriesRoutes");
let userAccountRoutes = require("./routes/userAccountRoutes");
app.use(productRoutes);
app.use(categoriesRoutes);
app.use(userAccountRoutes);
app.use(routes);
//create server
let port = process.env.Port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
