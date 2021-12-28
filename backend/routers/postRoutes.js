const express = require('express')
const Router = express.Router()

//Database functions Imports
const {getpost} = require('../controller/postController')


Router.get('/post',async(req,res)=>{
    const data = await getpost()
    res.send(data)

})

module.exports = Router