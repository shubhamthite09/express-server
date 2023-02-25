//<--- All Imports here  ---->
const express = require("express")
const menRouter = express.Router()
menRouter.use(express.json())
const {menModele} = require("../config/dbConnect")
//<--- END of Imports --->

//<--- GET route --->
menRouter.get("/",async(req,res)=>{
    try{
        if(req.query.search){
            let women = await menModele.find({$contains:{ProductName:req.query.search}})
            res.send(women)
        }else if(req.query.sort){
            if(req.query.sort == "lth"){
                let women = await menModele.sort({Price:-1})
                res.send(women)
            }else if(req.query.sort == "htl"){
                let women = await menModele.sort({Price:1})
                res.send(women)
            }
        }else if(req.query.rating){
            let women = await menModele.find({Rating:{$gte:req.query.rating}})
            res.send(women)
        }else if(req.query.limit){
            const {limit , page} = req.query
            console.log(limit,page);
            let women = await menModele.find().skip(10*page).limit(limit)
            res.send(women)
        }else{
            let women = await menModele.find()
            res.send(women)
        }
    }catch(err){
        res.send(err)
    }
})
//<--- END GET --->

//<--- All of Exports --->
module.exports = { menRouter }
//<--- END of Exports --->