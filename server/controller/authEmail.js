"use strict";
const nodemailer = require("nodemailer");
let sendAuthenticationEMail = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
};
let mailOptions = (receiptMail,subject, url) => {
  return {
    from: "SCU Store",
    to: receiptMail,
    subject: subject,
    html: url,
  };
};
module.exports = { sendAuthenticationEMail, mailOptions };
