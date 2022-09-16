const {Schema,model}=require('mongoose')
const {JWT_SECRET,JWT_EXPIRES,JWT_COOKIE_EXPIRE,NODE_ENV}=require('../config/index')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const AuthSchema=new Schema({
  username:{
    type:String,
    required:[true,'username is req'],
  },
  email:{
     type:String,
     match:[ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'valid email is req'],
     unique:true
  },
  password:{
     type:String,
     required:[true,'password is req'],
     minlength:[6,'minimum 6 char req'],
     select:false,
  },
  role:{
     type:String,
     enum:['user','publisher','admin'],
     default:'user'
  },
},{timestamps:true})

AuthSchema.pre('save',async function(){
    let salt= await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
})
AuthSchema.methods.getTOKEN=function(){
    return jwt.sign({id:this._id},JWT_SECRET,{expiresIn:JWT_EXPIRES})
 }

//match pasword
AuthSchema.methods.matchPASSWORD=async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password)
}




module.exports=model ('registerVehicle',AuthSchema)