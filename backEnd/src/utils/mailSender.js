const nodemailer = require('nodemailer')
require('dotenv').config()

exports.mailSender = async (email, subject, body) => {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false, // true for port 465, false for others
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  try {
    await transporter.sendMail({
      from: `"Mind Space + @<${process.env.MAIL_USER}>`,
      to: email,
      subject: subject,
      html: body
    })
    return { success: true }
  } catch (error) {
    console.error('Mail sending error:', error)
    return { success: false, error }
  }
}
