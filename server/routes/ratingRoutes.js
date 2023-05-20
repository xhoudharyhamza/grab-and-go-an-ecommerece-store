let express=require("express")
let router= express.Router()
let {postProductRating, fetchUserRatings, fetchAllRatings}=require('../controller/ratingControllers')
//api to post rating of product
router.post("/ratings", postProductRating)
//api to get ratings of a user
router.get('/ratings/:user', fetchUserRatings)
//api to fetch all ratings from rating collection
router.get('/ratings', fetchAllRatings)
module.exports =router