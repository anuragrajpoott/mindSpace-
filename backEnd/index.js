const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

require("dotenv").config()

const dbConnect = require("../backEnd/src/configs/database")

const auth = require("../backEnd/src/routes/auth")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"*",
    credentials:true
}))

dbConnect()

app.listen(process.env.PORT,()=>{
    console.log(`server running at port ${process.env.PORT}`)
})

app.use('/api/v1/auth',auth)

app.get("/",(req,res)=>{
    res.send(`<h4>server running at PORT ${process.env.PORT}</h4>`)
})


