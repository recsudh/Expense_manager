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

route.post("/signup",auth,async (req,res,next)=>{
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


module.exports = route;
