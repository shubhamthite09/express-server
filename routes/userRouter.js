//<--- All Imports here  ---->
const express = require("express")
const bcrypt = require("bcrypt")
const userRouter = express.Router()
userRouter.use(express.json())
const { userModle } = require("../config/dbConnect")
const jwt = require("jsonwebtoken")
//<--- END of Imports --->

//<--- POST route --->
userRouter.post('/add', async (req, res) => {
    try {
        const use = await userModle.findOne({ email: req.body.email })
        if (use != null) { res.send({ msg: `email is alredy exzist..` }) }
        else {
            const hasPass = await bcrypt.hash(req.body.password, 5)
            req.body.password = hasPass
            const user = new userModle(req.body)
            await user.save()
            res.send({ msg: `User Added ...` })
        }
    } catch (err) {
        res.send({ msg: err.messege })
    }
})
//<--- END POST --->

//<--- LOgin route --->
userRouter.post('/login', async (req, res) => {
    try {
        const user = await userModle.findOne({ email: req.body.email })
        if (user == null) { res.status(404).send({ msg: `user not found` }) }
        else {
            if (await bcrypt.compare(req.body.password, user.password)) {
                let token = jwt.sign({ name: user.name, userid: user._id }, process.env.secretKey, { expiresIn: "1h" })
                res.send({ name: user.name, token: token })
            } else {
                res.send({ msg: `Wrong creditnals ...` })
            }
        }
    } catch (err) {
        res.send({ msg: err.messege })
    }
})
//<--- END LOgin --->

//<--- All of Exports --->
module.exports = { userRouter }
//<--- END of Exports --->