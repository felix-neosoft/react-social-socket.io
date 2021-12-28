const postModel = require('../db/postSchema')
const { v4:uuidv4 } = require('uuid')

function addpost(data){
    return new Promise((resolve,reject)=>{
        let ins = new postModel({pid:uuidv4(),email:data.email,name:data.name,title:data.title,description:data.description,comments:[]})
        ins.save(err => {
            if(err) throw err
            resolve()
        })
    })
}

function getpost(){
    return new Promise((resolve,reject)=>{
        postModel.find({},(err,data)=>{
            if(err) reject('Error')
            resolve(data)
        })
    })
}

function addcomment(user){
    return new Promise((resolve,reject)=>{
        postModel.findOne({pid:user.id},(err,data)=>{
            if(err) reject()
            let comment = data.comments
            let form = {name:user.name,comment:user.comment}
            comment.push(form)
            postModel.updateOne({pid:data.pid},{$set:{comments:comment}},(err)=>{
                if(err) reject()
                else resolve()
            })
        })
    })
}



module.exports = { getpost, addpost, addcomment }


