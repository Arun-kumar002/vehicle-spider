const {Schema,model}=require('mongoose')
const {JWT_SECRET,JWT_EXPIRES,JWT_COOKIE_EXPIRE,NODE_ENV}=require('../config/index')
const jwt=require('jsonwebtoken')

const DeviceSchema=new  Schema({
    sim:{
        type:Schema.Types.ObjectId,
        ref:"Simdetails"  ,//population  
     },
     deviceimei:{
       type:String,
     },
     serialnumber:{
      type:String,
      required:[true,'serial no is true']
     },

})
DeviceSchema.methods.getTOKEN=function(){
   return jwt.sign({id:this._id},JWT_SECRET,{expiresIn:JWT_EXPIRES})
}
module.exports=model('devicedetails',DeviceSchema)