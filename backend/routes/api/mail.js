const express = require("express");
const router = express.Router();
const cors = require("cors");
const sendEmail = require("../../utils/sendEmail");

router.post("/sendmail", cors(), async (req, res) => {
  const { body, addresses, title } = req.body;
  try {
    const to = addresses;
    const from = process.env.MAIL_FROM;
    const subject = title;
    const message = `<p>${body}</p>

                      <ul>
                        <h5>Technologies:</h5>
                        <a href="https://nodemailer.com/about/">Nodemailer</a>
                        <a href="https://reactjs.org/docs/getting-started.html">React</a>
                        <a href="https://nodejs.org/en/docs/">Node</a>
                        <a href="https://redux.js.org/">Redux</a>
                      
                        <h5>Special Thanks to:</h5
                        <a href="https://github.com/Isaacc1998/MailMe/wiki/Group-Members-and-Work-Break-Down"><h5>Mailme Dev Team</h5></a>

                      </ul>
                      <img height="250px" src="cid:logo"/>
                    `;

    await sendEmail(subject, message, to, from);
    return res.json({ status: "sucess" });
  } catch (error) {
      return error.message;
  }
});

module.exports = router;


