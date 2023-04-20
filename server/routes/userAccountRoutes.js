let express = require("express");
let router = express.Router();
let authenticateUser = require("../middlewares/middlewares");
let {
  fetchAllUsers,
  logoutUser,
  updateUserEmailAddress,
  registerNewUsers,
  loginUsers,
  verifyingAccounts,
  fetchUserDetails,
  updateUserDetails,
} = require("../controller/api");
//API to register new user
router.post("/accounts/signup", registerNewUsers);
//API to login users
router.post("/accounts/login", loginUsers);
//API to authenticate user
router.get("/authentication", authenticateUser, async (req, res) => {});
//logout user
router.get("/accounts/logout", logoutUser);
//API to fetch all users
router.get("/accounts", fetchAllUsers);
//API to update user email
router.patch("/accounts/update-email/:email", updateUserEmailAddress);
//verifying the user account
router.get("/accounts/verification/:token", verifyingAccounts)
//API to get user Details
router.get("/accounts/users/:email", fetchUserDetails)
//API to update user account
router.patch('/accounts/users/:email', updateUserDetails)

module.exports = router;
