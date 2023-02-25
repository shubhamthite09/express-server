//<--- All Imports here  ---->
const express = require("express")
const cartRouter = express.Router()
cartRouter.use(express.json())
const {cartModele} = require("../config/dbConnect")
//<--- END of Imports --->

//<--- GET route --->
cartRouter.get("/",async(req,res)=>{
    try{
        let women = await cartModele.find({user:req.body.user})
        res.send(women)
    }catch(err){
        res.send(err)
    }
})
//<--- END GET --->

//<--- All of Exports --->
module.exports = { cartRouter }
//<--- END of Exports --->