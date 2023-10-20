const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(express.json());

app.use(cors());

app.post("/send-email", (req, res) => {
  const nodemailer = require("nodemailer");

  const { name, email, message } = req.body;

  const hostingerTransporter = nodemailer.createTransport({
    host: "mail.hostinger.com",
    port: 587,
    secure: false,
    auth: {
      user: "hamzaanis@digitaurus.tech",
      pass: "3DM-sols-pk",
    },
  });

  mailOptions = {
    from: "hamzaanis@digitaurus.tech",
    // to: 'hamzaanis@digitaurus.tech',
    text: `Name: ${name}
            Email: ${email}
            Message: ${message}
      `,
  };

  hostingerTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Email not sent" });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
