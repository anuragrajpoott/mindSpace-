const mongoose = require("mongoose")

const posts = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    },
    media:{
        type:String
    }

})

module.exports = mongoose.Schema("posts",posts)