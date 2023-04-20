let express = require("express");
let router = express.Router();
let {
  addNewProduct,
  getAllProducts,
  fetchSingleProduct,
  adminSearchProducts,
  deleteProduct,
  updateSingleProduct,
  fetchTopRatedProducts,
  fetchCategoryProducts,
  fetchNewCollections,
} = require("../controller/api");
//API to post product
router.post("/products", addNewProduct);
//API to get products
router.get("/products", getAllProducts);
// API to get single product details
router.get("/products/:slug", fetchSingleProduct);
//API to search products in admin panel
router.get("/products/search/:key", adminSearchProducts);
//API to delete single product
router.delete("/products/:_id", deleteProduct);
//API to update product
router.patch("/products/:_id", updateSingleProduct);
//API to fetch top rated products
router.get("/top-rated", fetchTopRatedProducts);
// API to get category products
router.get("/products/categories/:category", fetchCategoryProducts);
//API to fetch new products collections
router.get("/new-collections", fetchNewCollections);
module.exports=router
