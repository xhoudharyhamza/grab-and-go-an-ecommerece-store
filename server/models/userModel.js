let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: String,
    default: "false",
    required: true,
  },
  isVerified: {
    type: String,
    default: "false",
    required: true,
  },
  token:{
    type:String,
    required:true,
  }
});
let User = mongoose.model("User", userSchema);
module.exports = User;
