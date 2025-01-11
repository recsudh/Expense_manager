const express = require("express");
const { User } = require("../db/model");
const { z } = require("zod");
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

const route = express.Router();

route.post("/create", async (req, res, next) => {
  try {
    // validation
    const requirebody = z.object({
      name: z.string().min(5),
      email: z.string().email(),
      password: z.string().min(5),
    });
    const validatebody = requirebody.safeParse(req.body);
    console.log(validatebody);
    if (!validatebody.success) {
       return res.json({
        status:"failed",
        error: validatebody.error.issues
       });
    }
    // console.log(req.body);
    User.create(req.body);
    res.status(201).send("created!!");
  } catch (e) {
    console.log(e);
    next()
  }
});

// singup

route.post("/signup",async (req,res,next)=>{
    try{
        
            // validation
            const requirebody = z.object({
            email: z.string().email(),
            password: z.string().min(5),
             });
            const validatebody = requirebody.safeParse(req.body);
            // console.log(validatebody);
            if (!validatebody.success) {
                return res.json({
                status:"failed",
                error: validatebody.error.issues
                });
            }
            // console.log(req.body);
            const user = await User.findOne({email:req.body.email})
            if(!user){
                    throw new Error("no user found!!")
            }
            const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
            console.log(token);
            res.json({
                status:"Found",
                user,
                token
            })
            }catch(e){
                next()
            }
})    

// get 
route.get("/fetch",auth,async (req,res,next)=>{
  try{
    const user_id= req.user_id
    console.log(req.user_id);
    const user = await User.findOne({_id:user_id})
    console.log(user);
    if(!user){
      throw new Error("No user found!!")
    }
    res.status(200).send({
      status:"Found",
      user
    })
  }catch(e){
    console.log(e);
    res.json({
      status:"Failed",
      Error:"no user found!!"
    })
  }
})

module.exports = route;
