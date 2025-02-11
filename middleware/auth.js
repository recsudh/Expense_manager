const jwt = require("jsonwebtoken")
function auth (req,res,next){
    try{ 
    // console.log(req.headers);
    const token = req.header("Authorization").replace("Bearer ","")
    // console.log(token);
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    // console.log(decode);
    req.user_id= decode._id
    console.log(user_id);
    next()
    }catch(e){
        next()
    }
  
}
module.exports= auth