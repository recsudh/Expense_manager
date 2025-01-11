const express = require("express");
const { expense } = require("../db/model");
const auth = require("../middleware/auth")
const {z}= require("zod")
const route = express.Router()

route.post("/add",auth,async(req,res,next)=>{
    try{
        // validation
        const requirebody= z.object({
            amount:z.number(),
            description:z.string()
        })

        const parsebody= requirebody.safeParse(req.body)
        if(!parsebody.success){
            return res.json({
                Status:"Failed",
                Error:parsebody.error.issues
            })
        }
        const userId= req.user_id
        expense.create({...req.body,userId:userId})
        res.status(201).send({status:"created"})
        
    }catch(e){
        console.log(e);
        next(e)
    }
})

// fetch by user_id

route.get("/fetch",auth,async(req,res,next)=>{
    try{
        const userId= req.user_id
        const Expense =await  expense.find({userId})
        console.log(Expense);
        res.status(200).send({
            status:"Found",
            Expense
        })
    }catch(e){
        console.log(e);
    }

})



module.exports=route