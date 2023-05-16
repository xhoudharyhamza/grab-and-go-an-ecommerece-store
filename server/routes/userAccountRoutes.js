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
  sendOtpToUser,
  forgotPasswordVerifyEmail,
  forgotPasswordUpdatePassword,
} = require("../controller/api");
//API to register new user
router.post("/accounts/signup", registerNewUsers);
//API to login users
router.post("/accounts/login", loginUsers);
//API to authenticate user
router.get("/authentication", authenticateUser, async (req, res) => { });
//logout user
router.get("/accounts/logout", logoutUser);
//API to fetch all users
router.get("/accounts", fetchAllUsers);
//API to update user email
router.patch("/accounts/update-email/:email", updateUserEmailAddress);
//API to send otp to user for update email
router.get('/accounts/update-email/:email', sendOtpToUser)
//verifying the user account
router.get("/accounts/verification/:token", verifyingAccounts)
//API to get user Details
router.get("/accounts/users/:email", fetchUserDetails)
//API to update user account
router.patch('/accounts/users/:email', updateUserDetails)
//API to verify email for forgot password
router.post('/accounts/forgotpassword', forgotPasswordVerifyEmail)
//API to update password for forgot password request
router.patch('/accounts/forgotpassword/:email', forgotPasswordUpdatePassword)

module.exports = router;
