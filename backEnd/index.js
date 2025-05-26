const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const dbConnect = require("../backEnd/src/configs/database")
const auth = require("../backEnd/src/routes/auth")

const app = express()

// Connect to database
dbConnect()

// Middleware
app.use(express.json())
app.use(cookieParser())

// Set your frontend URL here, not "*"
app.use(cors({
    origin: "*",
    credentials: true
}))

// Routes
app.use('/api/v1/auth', auth)

app.get("/", (req, res) => {
    res.send(`<h4>server running at PORT ${process.env.PORT}</h4>`)
})

// Global error handler (optional)
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ success: false, message: "Something broke!", error: err.message })
})

// Start server
app.listen(process.env.PORT, () => {
    console.log(`server running at port ${process.env.PORT}`)
})
