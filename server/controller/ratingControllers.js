let express = require("express")
let Rating = require('../models/ratingModel');
const Product = require("../models/productModel");
//controller to post rating
let postProductRating = async (req, res) => {
    try {
        let { rating, slug, email } = req.body;
        let productRating = await Rating.findOne({ user: email, product: slug });

        if (productRating) {
            res.status(400).json({ error: "You already rated this product" });
        } else {
            let newRating = new Rating({ user: email, product: slug, rate: rating });
            let product = await Product.findOne({ slug })
            if (product) {
                let count = product.rating.count + 1
                let rate = product.rating.rate + rating / 2
                let updatedProduct = await Product.updateOne({ slug }, { $set: { rating: { count, rate } } })
                await newRating.save();
                res.status(200).json({ newRating });
            }
            else {
                res.status(404).json({ error: "Couldn't find the product that you want to rate" });
            }
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
//controller to fetch ratings of the user
let fetchUserRatings = async (req, res) => {
    try {
        let { user } = req.params
        let ratings = await Rating.find({ user })
        res.status(200).json({ ratings })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
let fetchAllRatings=async(req,res)=>{
try {
    console.log("request has been received for raings")
    let ratings=await Rating.find()
    console.log(ratings)
    res.status(200).json({ratings})
} catch (error) {
    res.status(404).json({ error: error.message })
}
}
module.exports = { postProductRating, fetchUserRatings,fetchAllRatings };
