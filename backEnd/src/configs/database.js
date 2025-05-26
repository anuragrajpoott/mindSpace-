const mongoose = require("mongoose")
require("dotenv").config()

const dbConnect = () => {

    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("database connected")
    }).catch(()=>{
        console.log("error");
        console.error(error);
        process.exit(1);
    })

}

module.exports = dbConnect