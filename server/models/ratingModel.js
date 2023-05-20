let mongoose = require("mongoose")
let ratingSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true,
    },
    rate: {
        type: Number,
        require: true
    },
    product: {
        type: String,
        require: true
    }
})
let Rating = mongoose.model("Rating", ratingSchema)
module.exports = Rating