const bcrypt = require('bcrypt')
const {createToken} = require('./jwt')

//db Schema Imports
const userModel = require('../db/userSchema')

function checkUser(data){
    return new Promise((resolve,reject)=>{
        userModel.findOne({email:data},(err,data)=>{
            if(err) reject({"err":1,"msg":"Something went Wrong","status":"REJECT"})
            else if(data!==null) resolve({"err":0,"msg":"User Already Exist","status":"REJECT"})
            else resolve({"err":0,"msg":"User Not Exist","status":"APPROVE"})
        })
    })
}


function getUser(user){
    return new Promise((resolve,reject)=>{
        //checking whether user exist
        userModel.findOne({email:user.email},async(err,data)=>{
            if(err) reject({"err":1,"msg":"Something went Wrong"})
            else if(data===null) resolve({"err":1,"msg":"User Not Exist"})
            else{
                //checking if password is correct
                const checkPassword = await bcrypt.compare(user.password,data.password)
                if(checkPassword){
                    //creating a token
                    const token = await createToken(data.email,data.first_name)
                    resolve({"err":0,"msg":"Login Successful","token":token})
                }
                else resolve({"err":1,"msg":"Login Failed"})
            }
        })
    })
}

async function addUser(data) {
    // check whether user exist
    const status = await checkUser(data.email)
    if(status.status==='APPROVE'){
        // encrypting password
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(data.password,salt)
        // inserting user data to database
        return new Promise((resolve,reject)=>{
            let ins = new userModel({first_name:data.fname,last_name:data.lname,email:data.email,password:password})
            ins.save(err =>{
                if(err) reject({"err":1,"msg":"Something went Wrong"})
                else resolve({"err":0,"msg":"Data Stored Successfully"})
            })
        })
    }
    else return status
}

module.exports = {getUser, addUser}