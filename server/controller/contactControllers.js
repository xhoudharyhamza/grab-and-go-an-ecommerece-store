let ContactMessage = require('../models/contactModel')
let { sendAuthenticationEMail, mailOptions } = require("./authEmail");
let postContactMessage = async (req, res) => {
  try {
    console.log(req.body)
    let message = await new ContactMessage(req.body)
    await message.save();
    if (message) {
      let transporter = sendAuthenticationEMail();
      let subject = "New Contact Message";
      let body = `
      <b>From:</b> ${message.name}<br></br>
      <b>Email:</b> ${message.email}<br></br>
      <b>Message:</b> ${message.message}<br></br>
    `;
      let options = mailOptions(process.env.USER, subject, body);
      let sendEmail = await transporter.sendMail(options);
      res.status(200).json({ message: "Message has been sent successfully" });
    } else {
      res.status(404).json({
        error: "Something Went Wrong! Couldn't send message this time",
      });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
let fetchContactMessages = async (req, res) => {
  try {
    let messages = await ContactMessage.find({})
    res.status(200).json({ messages })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}
module.exports = { postContactMessage, fetchContactMessages }