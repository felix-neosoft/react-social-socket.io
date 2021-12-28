const mongoose = require('mongoose')

const db = 'mongodb://localhost:27017/chat_app'

const connect = async() => {
    try{
        await mongoose.connect(db,{useNewUrlParser:true})
        console.log("Database Connected")
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports = connect