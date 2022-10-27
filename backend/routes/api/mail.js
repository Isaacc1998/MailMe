const express = require('express')
const router = express.Router() 
const cors = require("cors")
const sendEmail = require("../../utils/sendEmail")

router.post("/sendmail", cors(), async (req, res) => {
    console.log(req.body)
    const { text, addresses, title } = req.body;
    try {
        const to = addresses
        const from = process.env.MAIL_FROM
        const subject = title
        const message = `<p>${text}</p>`
        await sendEmail(subject, message, to, from)
        return res.json({status: 'sucess'}) 
    } catch (error) {
        return error.message
    }
})

module.exports = router;