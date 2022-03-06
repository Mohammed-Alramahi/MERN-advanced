const nodeMailer = require('nodemailer');

const sendMail = (options) => {
    const transporter = nodeMailer.createTransport("Smtp",{
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const mailOptions = {
        from:process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html:options.text
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (!err) {
            console.log(info);
        }
        else {
            console.log(err);
        }
    })
}
module.exports = sendMail;