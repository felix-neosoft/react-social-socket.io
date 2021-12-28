const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').createServer(app)
const io = require('socket.io')(http)


app.use(cors())

//Raw data to json data conversion
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Database Connectivity
const db = require('./config/db')
db()

//Routes Connection
const userRouter = require('./routers/userRoutes')
const postRouter = require('./routers/postRoutes')
app.use('/api',userRouter)
app.use('/api',postRouter)


//Socket Configuration
const socket = require('./config/socket')
socket(io)


http.listen(4000,err =>{
    if(err) throw err
    console.log("Server Started at 4000")
})