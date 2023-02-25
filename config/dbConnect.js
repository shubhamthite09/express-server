//<--- All Imports here  ---->
const mongoose = require("mongoose")
mongoose.set('strictQuery', false)
require("dotenv").config()
//<--- END of Imports --->

//<--- Connection to DB instance --->
const connection = mongoose.connect(process.env.mongoURL)
//<--- END of connection --->

//<--- User Scheema instance --->
const userSchema = mongoose.Schema({
    "name": { type: String, required: true },
    "email": { type: String, required: true },
    "mobile": { type: Number, required: true },
    "location": { type: String, required: true },
    "password": { type: String, required: true },
    "cart": { type: [] }
})
//<--- END of scheema --->

//<--- User Scheema instance --->
const productSchema = mongoose.Schema({
    "id": { type: String },
    "Img": { type: String, required: true },
    "Inventry": { type: Number },
    "ProductName": { type: String, required: true },
    "Price-Strick": { type: Number },
    "Price": { type: Number, required: true },
    "Size": { type: String, required: true },
    "Rating": { type: Number, required: true }
})
//<--- END of scheema --->

//<--- User Scheema instance --->
const cartSchema = mongoose.Schema({
    "id": { type: String },
    "user": { type: String }
})
//<--- END of scheema --->

//<--- userModle constractor instance --->
const userModle = mongoose.model('user', userSchema)
const womenModle = mongoose.model('women', productSchema)
const menModele = mongoose.model('men', productSchema)
const homeModele = mongoose.model('home', productSchema)
const cartModele = mongoose.model('cart', cartSchema)
//<--- END of Consractor --->

//<--- All of Exports --->
module.exports = { connection, userModle, womenModle, menModele, homeModele, cartModele }
//<--- END of Exports --->