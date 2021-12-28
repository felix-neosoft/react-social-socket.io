const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    }
})

module.exports = mongoose.model("userdata",userSchema)

