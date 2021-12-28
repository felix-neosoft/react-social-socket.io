const { getpost, addpost, addcomment } = require("../controller/postController")

module.exports = (io) =>{

    io.on('connection',socket =>{
        socket.on('add_post',async ({email,name,title,description,comments})=>{
            await addpost({"email":email,"name":name,"title":title,"description":description,"comments":comments})
            const data = await getpost()
            socket.emit('get_post',{data:data})
        })

        socket.on('add_comment',async({id,name,comment})=>{
            await addcomment({id:id,name:name,comment:comment})
            const data = await getpost()
            socket.emit('get_post',{data:data})
        })

        socket.on('disconnect',()=>{
            console.log("A user disconnected")
        })
    })

}

