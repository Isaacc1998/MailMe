const nodemailer = require("nodemailer")

const sendEmail = async (subject, message, to, from) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: "587",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const options = {
        from: from,
        to: to,
        subject: subject,
        html: message
    }

    transporter.sendMail(options, function(err, info) {
        err ? console.log(err) : console.log(info)
    })
}

module.exports = sendEmail