let User = require("../models/userModel");
let jwt = require("jsonwebtoken");
let authenticateUser = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    if (token) {
      let validToken = await jwt.verify(token, process.env.SECRET_KEY);
      if (validToken) {
        let _id = validToken.id;
        let user = await User.findOne({ _id });
        if (user) {
          res.status(200).json({ user });
        } else {
          res.status(401).json({ user: null });
        }
      } else {
        res.status(401).json({ user: null });
      }
    } else {
      res.status(401).json({ user: null });
    }
  } catch (error) {
    res.status(404).json({ user: null });
  }
};
module.exports = authenticateUser;
