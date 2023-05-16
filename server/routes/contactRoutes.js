let express = require("express");
let router = express.Router();
let {postContactMessage, fetchContactMessages}=require('../controller/contactControllers')
router.post("/contact", postContactMessage);
router.get('/contact', fetchContactMessages)
module.exports=router
