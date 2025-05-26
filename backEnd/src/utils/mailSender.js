const nodeMailer = require('nodemailer')

require('dotenv').config()

exports.mailSender = async (email,subject,body)=>{
    let transporter = nodeMailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })

    try {
        await transporter.sendMail({
            from:"Supportify...",
            to:`${email}`,
            subject:`${subject}`,
            html:`${body}`
        })
    } catch (error) {

        console.log(error)
        
    }
}