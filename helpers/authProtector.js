const jwt=require('jsonwebtoken')
const SimSchema=require('../models/SimModel')
const DeviceSchema=require('../models/DeviceModel')
const ErrorResponse=require('../utils/ErrorResponse')
const {JWT_SECRET}=require('../config/index')

let protected=async (req,res,next)=>{
    let token;
    //checking header
    if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
        token=req.headers.authorization.split(' ')[1];
        console.log('im come');
    }
   if(!token){
    return next(new ErrorResponse('not authorized',403))
   }
   try {
     //verify token 
     let decode=jwt.verify(token,JWT_SECRET);
     req.user=await SimSchema.findById(decode.id)
    //  console.log( req.user);
   } catch (err) {
    console.log(err);
    return next(new ErrorResponse('not authorized invalid token',403))
   }

   next()
}
let deviceprotected=async (req,res,next)=>{
    let token;
    //checking header
    if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
        token=req.headers.authorization.split(' ')[1];
        console.log('im come');
    }
   if(!token){
    return next(new ErrorResponse('not authorized',403))
   }
   try {
     //verify token 
     let decode=jwt.verify(token,JWT_SECRET);
     req.user=await DeviceSchema.findById(decode.id)
    //  console.log( req.user);
   } catch (err) {
    console.log(err);
    return next(new ErrorResponse('not authorized invalid token',403))
   }

   next()
}


module.exports={protected,deviceprotected}