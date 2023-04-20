let mongoose = require("mongoose");
let tokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
let UniqueToken = mongoose.model("UniqueToken", tokenSchema);
module.exports = UniqueToken;
