const user = require('../models/user')

const mailSender = require("../utils/mailSender")

const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')

require("dotenv").config()



exports.sendOtp = async (req,res) =>{
    try {
        const {email} = req.body

        if(!email){
            res.status(404).json({
                sucess:false,
                message:"email not found"
            })
        }

        const existingUser = user.findOne({email});

        if(email==existingUser.email){
            res.status(400).json({
                success:false,
                message:"user already registered"
            })
        }

        const newOtp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        user.create({
            otp:newOtp
        })


        const newMail = mailSender(email,"otp for verification",`<h4>${newOtp}</h4>`)

        res.status(200).json({
            success:true,
            message:"otp send successfully",
            newMail
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:"error while sending otp",
            error:error
        })
        
    }
}

exports.signUp = async (req,res) => {
    try {
        const {userName,password,confirmPassword} = req.body

        if(!userName || !password || !confirmPassword){
            return res.status(404).json({
                success:false,
                message:"fill all signup details"
            })
        }

        if(password!=confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password doesn't matched"
            })
        }

        const existingUser =  await user.findOne({userName});

        if(existingUser){
            return res.status(400).json({
                sucess:false,
                message:"user already registered"
            })
        }

        let hashedPassword = await bcrypt.hash(password,10)

        const newUser =  await user.create({userName,password:hashedPassword})

        const token = jwt.sign({
            userName:userName
        },process.env.JWT_SECRET,{
            expiresIn: '24h'
        })

        newUser.token = token

        newUser.password = undefined

        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true
        }

        return res.cookie("token",token,options).status(200).json({
            success:true,
            message:"user sign in success",
            newUser
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:`error while creating account...`,
            error
        })
        
    }
}


exports.logIn = async(req,res)=>{
    try {
        const {userName,password} = req.body

        if(!userName || !password){
            return res.status(404).json({
                success:false,
                message:"fill all login details"
            })
        }

        const existingUser = await user.findOne({userName})

        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"user is not registered"
            })
        }

        if(! await bcrypt.compare(password,existingUser.password)){
            return res.status(400).json({
                success:false,
                message:"incorrect password"
            })
        }

        const token = jwt.sign({
            userName:existingUser.userName
        },process.env.JWT_SECRET,{
            expiresIn: '24h'
        })

        existingUser.token = token

        existingUser.password = undefined

        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true
        }

        return res.cookie("token",token,options).status(200).json({
            success:true,
            message:"user logged in success...",
            existingUser
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"error while logging in...",
            error
        })
        
    }
}

