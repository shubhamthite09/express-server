//<--- All Imports here  ---->
const express = require("express")
const homeRouter = express.Router()
homeRouter.use(express.json())
const {homeModele} = require("../config/dbConnect")
//<--- END of Imports --->

//<--- GET route --->
homeRouter.get("/",async(req,res)=>{
    try{
        if(req.query == "search"){
            let women = await homeModele.find({$contains:{ProductName:req.query.search}})
            res.send(women)
        }else if(req.query == "sort"){
            if(req.query.sort == "lth"){
                let women = await homeModele.sort({Price:-1})
                res.send(women)
            }else if(req.query.sort == "htl"){
                let women = await homeModele.sort({Price:1})
                res.send(women)
            }
        }else if(req.query == "rating"){
            let women = await homeModele.find({Rating:{$gte:req.query.rating}})
            res.send(women)
        }else if(req.query == "limit"){
            let women = await homeModele.find().limit(req.query.limit)
            res.send(women)
        }else if(req.query.limit){
            const {limit , page} = req.query
            console.log(limit,page);
            let women = await homeModele.find().skip(10*page).limit(limit)
            res.send(women)
        }else{
            let women = await homeModele.find()
        res.send(women)
        }
    }catch(err){
        res.send(err)
    }
})
//<--- END GET --->

//<--- All of Exports --->
module.exports = { homeRouter }
//<--- END of Exports --->