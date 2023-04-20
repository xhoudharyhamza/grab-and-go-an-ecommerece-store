let mongoose = require("mongoose");
let productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sizes:{
    type:[String]
  },
  rating: {
    rate: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
});
productSchema.index({ slug: 'text', title: 'text', amount: 'text', category: 'text', description: 'text' });
let Product = mongoose.model("Product", productSchema);
module.exports = Product;
