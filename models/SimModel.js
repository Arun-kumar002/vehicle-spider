const {Schema,model}=require('mongoose')
const {JWT_SECRET,JWT_EXPIRES,JWT_COOKIE_EXPIRE,NODE_ENV}=require('../config/index')
const jwt=require('jsonwebtoken')

const SimSchema=new  Schema({

  phone:{
    type:String,
    reuired:[true,'phone no is required']
  },
  iccid:{
    type:String,
  
  }
  
},{timestamps:true})

SimSchema.methods.getTOKEN=function(){
    return jwt.sign({id:this._id},JWT_SECRET,{expiresIn:JWT_EXPIRES})
 }
module.exports=model('Simdetails',SimSchema)