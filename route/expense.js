const express = require("express");
const { total,expense } = require("../db/model");
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

// route.get("/fetch",auth,async(req,res,next)=>{
//     try{
//         const userId= req.user_id
//         const Expense =await  expense.find({userId})
//         console.log(Expense);
//         res.status(200).send({
//             status:"Found",
//             Expense
//         })
//     }catch(e){
//         console.log(e);
//         res.status(500).send(e)
//     }

// })

route.get("/list",auth,async (req,res)=>{   
    try{
        const userId= req.user_id
        const list = await expense.find({userId})
        const new_list= list.map(ele=>{
            return { 
                description: ele.description,
                amount:ele.amount
             }
        })

        console.log(new_list);
        res.status(200).send({
            status:"Utilities and Amount",
            new_list
        })
    }catch(e){
        console.log(e);
    }
})

route.get("/overall",auth,async(req,res,next)=>{
    try{ 
        const userId= req.user_id
        const list = await expense.find({userId})
        const amount= list.map(ele=>{
            return ele.amount
             
        })
       let sum = 0
        amount.filter(ele=>{
            sum = sum+ele
        })
        total.create({
            amount:sum,
            userId:userId
        })
        res.status(200).send({
            status:"Overall Expense",
            amount: sum
        })

    }catch(e){
        console.log(e);
        res.json({
            status:"Failed"
        })
    }

})


module.exports=route