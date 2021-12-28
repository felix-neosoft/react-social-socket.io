const jwt = require('jsonwebtoken')

const jwtSecretKey = 'RTmGNVD395sznmufBfn9'

function createToken(email,name){
    return new Promise((resolve,reject)=>{
        let payload = {uid:email,name:name}
         resolve(jwt.sign(payload,jwtSecretKey,{expiresIn:3600000}))
    })
}

module.exports = {createToken}