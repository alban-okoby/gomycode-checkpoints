const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "digitalsouag@gmail.com",
    pass: "tbfpsmuhdsehcdri"
  }
});

transporter.sendMail({
  from: "digitalsouag@gmail.com",
  to: "albanokoby225@gmail.com",
  subject: "Test Email",
  text: "Hello from Node.js"
}, (err, info) => {
  if (err) return console.log(err);
  console.log("Email sent:", info.response);
});