const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    pid:{
        type:String,
        unique:true
    },
    email:{
        type: String
    },
    name:{
        type: String
    },
    title:{
        type: String
    },
    description:{
        type:String
    },
    comments:[{
        name: String,
        comment: String
    }]
})


module.exports = mongoose.model("postData",postSchema)


