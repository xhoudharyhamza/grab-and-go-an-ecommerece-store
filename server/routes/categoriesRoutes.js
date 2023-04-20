let express = require("express");
let router = express.Router();
let {fetchAllProductsCategories, addProductsCategory,deleteProductsCategory,fetchCategoryDetails,updateCategory}=require('../controller/api')
//API to fetch products categories
router.get("/product/categories", fetchAllProductsCategories);
//API to post categories
router.post("/products/categories", addProductsCategory);
//API to delete products category
router.delete("/categories/:_id", deleteProductsCategory);
//API to get category details
router.get("/categories/:slug", fetchCategoryDetails);
//API to update category
router.patch("/categories/:_id", updateCategory);
module.exports=router