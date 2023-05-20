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
let mailOptions = (receiptMail,subject, body) => {
  return {
    from: "hamzashraf930@gmail.com",
    to: receiptMail,
    subject: subject,
    html: body,
  };
};
module.exports = { sendAuthenticationEMail, mailOptions };