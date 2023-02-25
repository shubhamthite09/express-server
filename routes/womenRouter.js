//<--- All Imports here  ---->
const express = require("express")
const womenRouter = express.Router()
womenRouter.use(express.json())
const {womenModle} = require("../config/dbConnect")
//<--- END of Imports --->

//<--- GET route --->
womenRouter.get("/",async(req,res)=>{
    try{
        if(req.query == "search"){
            let women = await womenModle.find({$contains:{ProductName:req.query.search}})
            res.send(women)
        }else if(req.query == "sort"){
            if(req.query.sort == "lth"){
                let women = await womenModle.sort({Price:-1})
                res.send(women)
            }else if(req.query.sort == "htl"){
                let women = await womenModle.sort({Price:1})
                res.send(women)
            }
        }else if(req.query == "rating"){
            let women = await womenModle.find({Rating:{$gte:req.query.rating}})
            res.send(women)
        }else if(req.query == "limit"){
            let women = await womenModle.find().limit(req.query.limit)
            res.send(women)
        }else if(req.query.limit){
            const {limit , page} = req.query
            console.log(limit,page);
            let women = await womenModle.find().skip(10*page).limit(limit)
            res.send(women)
        }else{
            let women = await womenModle.find()
        res.send(women)
        }
    }catch(err){
        res.send(err)
    }
})
//<--- END GET --->

//<--- All of Exports --->
module.exports = { womenRouter }
//<--- END of Exports --->