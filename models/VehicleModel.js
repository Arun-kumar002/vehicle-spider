const {Schema,model}=require('mongoose')


const VehicleSchema=new  Schema({
    device:{
        type:Schema.Types.ObjectId,
        ref:"devicedetails"  ,//population  
     },
 
     vehicleno:{
        type:String,
        required:[true,'vehicle no is required']
     },
     vehicletype:{
        type:String
     },
     vehiclemodel:{
        type:String
     }
},{timestamps:true})

module.exports=model('Vehicledetails',VehicleSchema)