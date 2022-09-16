const VehicleSchema=require('../models/VehicleModel')
const SimSchema=require('../models/SimModel')
const DeviceSchema=require('../models/DeviceModel')
const ErrorResponse=require('../utils/ErrorResponse')

exports.simcreateController=async(req,res,next)=>{
try {
    let payload=await SimSchema(req.body).save()
    console.log(payload);
    let token=payload.getTOKEN()
    res.status(200).json({success:true,token})
} catch (error) {
    console.log(err)
    next(new ErrorResponse('error machi',500))
}
}

exports.deviceCreateController=async(req,res,next)=>{
    try {
        console.log(req.user.id);
        // console.log(req.body);
        let sim=req.user.id
        let data={sim,...req.body}
        let payload=await DeviceSchema(data).save()
        console.log(payload);
        let token=payload.getTOKEN()
        res.status(200).json({success:true,token})
    } catch (error) {
        console.log(error)
        res.send('not ok')
    }
}

exports.vehicleCreateController=async(req,res,next)=>{
    try {
        console.log(req.user.id);
        let device=req.user.id;
        let data={device,...req.body}
       let payload=await VehicleSchema(data).save()
       res.status(200).json({success:true,payload})

    } catch (error) {
        console.log(error);
        res.end('not ok')
    }
}
exports.getVechicle=async(req,res,next)=>{
    try {
        console.log(req.user.id);
      let payload=await VehicleSchema.find().populate('device',['deviceimei','serialnumber','sim'])
      let data=await DeviceSchema.find().populate('sim',['phone'])
      res.status(200).json({success:true,data,payload})
    } catch (error) {
        console.log(error);
        res.end('not ok')
    }
}
exports.postSearch=async(req,res,next)=>{
    try {
        console.log(req.body);
        let {vehicleno}=req.body
        let payload=await VehicleSchema.findOne({vehicleno:vehicleno}).populate('device',['deviceimei','serialnumber','sim'])
        let sim=payload.device.sim
        let data=await SimSchema.find({_id:sim}).lean()
        console.log(data);
        res.status(200).json({success:true,data,payload})
    } catch (error) {
        console.log(error);
        next(new ErrorResponse('error',400))
    }
}
