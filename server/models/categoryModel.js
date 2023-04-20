let mongoose = require("mongoose");
let categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});
let Category = mongoose.model("Category", categorySchema);
module.exports = Category;
