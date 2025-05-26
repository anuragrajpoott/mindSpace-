const express = require("express")
const router = express.Router()

const {
    sendOtp,
    signUp,
    logIn
} = require("../controllers/auth")

router.post("/sign-up", signUp)

router.post("/log-in", logIn)

router.post("/send-otp", sendOtp)  // <-- fixed here

module.exports = router
