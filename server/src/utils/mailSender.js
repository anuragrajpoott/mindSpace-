const nodemailer = require('nodemailer')
require('dotenv').config()

// Create transporter once
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false, // true for port 465, false for others
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

exports.mailSender = async (email, subject, body) => {
  if (!email || !subject || !body) {
    return { success: false, error: 'Missing required email parameters' }
  }

  try {
    await transporter.sendMail({
      from: `"Mind Space + @" <${process.env.MAIL_USER}>`,
      to: email,
      subject,
      text: body.replace(/<\/?[^>]+(>|$)/g, ""), // Simple HTML tags stripped for text fallback
      html: body,
    })
    return { success: true }
  } catch (error) {
    console.error('Mail sending error:', error)
    return { success: false, error }
  }
}
