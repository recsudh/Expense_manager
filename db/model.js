const mongoose = require("mongoose")
const bcryptjs= require("bcryptjs")

const userschema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const expenseschema = new mongoose.Schema({
    amount:Number,
    description:String,
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
})

userschema.pre("save",async function(next){
    const user = this
    if(user.isModified("password")){
        user.password= await bcryptjs.hash(user.password,8)
    }
    next()
})


const User = mongoose.model("User",userschema)
const expense = mongoose.model("expense",expenseschema)

module.exports={
    User,
    expense
}