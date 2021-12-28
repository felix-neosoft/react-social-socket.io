const express = require('express')
const Router = express.Router()

//Database Functions Imports
const {getUser ,addUser} = require('../controller/userController')



// User Data Routing


Router.post('/user',async(req,res)=>{
        const msg = await addUser(req.body)
        res.json(msg)
})

Router.get('/user',async(req,res)=>{
    const msg = await getUser(req.query)
    res.json(msg)
})

module.exports = Router