const {connect}=require('mongoose')
const {success,error,info}=require('consola')
const {MONGODB_URL,MONGODB_CLOUD_URL,PORT,NODE_ENV}=require('./index')

let connectDb=async()=>{
 try {
    if(NODE_ENV==="development"){
        await connect(MONGODB_URL)
        success('local mongo db connected')
      }
      else{
        await connect(MONGODB_CLOUD_URL)
        success('cloud mongo atlas connected')
      }
    
 } catch (error) {
    error(err)
 }
}

module.exports=connectDb;