//<--- All Imports here  ---->
const {userModle} = require("../config/dbConnect")
const fs = require("fs")
const jwt = require("jsonwebtoken")
//<--- END of Imports --->

//<--- Middleware userLogger function's here --->
// const userLogger=async(req,res,next)=>{
//     const use = await userModle.findOne({email:req.body.email})
//     let date = Date(Date.now()).toString("hex")
//     fs.appendFileSync("./log.txt",`The \n`)
//     next()
// }
//<--- END userLogger --->

//<--- Middleware jwt check function's here --->
const jwtcheck=async(req,res,next)=>{
    let token = req.headers.Authorization
    jwt.verify(token,process.env.secretKey,(decode,err)=>{
        if(decode){
            req.body.user = decode.userid
            req.body.name = decode.name
            next()
        }else{
            res.send({err:`jwt needed...`})
        }
    })
}
//<--- END jwt check --->

//<--- All of Exports --->
module.exports = {jwtcheck}
//<--- END of Exports --->