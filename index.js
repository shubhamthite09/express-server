//<--- All Imports here  ---->
require("dotenv").config()
const express = require("express")
const app = express()
const {connection} = require("./config/dbConnect")
//const {userLogger} = require("./middleware/middle")
const {userRouter} = require("./routes/userRouter")
const {menRouter} = require("./routes/menRouter")
const {homeRouter} = require("./routes/homeRouter")
const {cartRouter} = require("./routes/cart")
const {womenRouter} = require("./routes/womenRouter")
const {jwtcheck} = require("./middleware/middle")
const cors = require("cors")
//<--- END of Imports --->

//<--- All of Middleware here --->
app.use(cors())
app.use(express.json())
// app.use('/',userLogger)
app.use('/men',menRouter)
app.use('/women',womenRouter)
app.use('/home',homeRouter)
app.use('/user',userRouter)
app.use(jwtcheck)
app.use('/cart',cartRouter)
//<--- END of Middleware --->

//<--- Home Route --->
app.get("/",(req,res)=>{res.send({msg:`Welcome to home route`})})
//<--- END of home route --->

//<--- Port listing --->
app.listen(process.env.PORT,async()=>{
    try{await connection
        console.log(`DB connected ...`)
    }catch(err){console.log(err)}
    console.log(`Server runing on port ${process.env.PORT}`)
})
//<--- END of Port listing --->