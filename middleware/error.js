 function error(err,req,res,next){
    if(err){
        console.log(err);
        res.status(500).send({
            status:"failed",
            Error : err
        })
        next()
    }
 }

 module.exports= error