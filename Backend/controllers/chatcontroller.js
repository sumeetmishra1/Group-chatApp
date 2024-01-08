const {Op}=require('sequelize');
const Message=require('../models/chat');
const S3services=require('../Services/s3services');
exports.sendMessage=async(req,res,next)=>{
    try{
        const name=req.user.name;
        const message=req.body.message;
        const gpId=req.body.gpId;
        const response=await Message.create({
        name:name,
        message:message,
        userId:req.user.id,
        groupId:gpId
        })
        res.status(200).json({message:response})
    }
    catch(e){
        res.status(404).json({message:e.message});
    }
    
}
exports.uploadfile=async(req,res)=>{
    try{
    const file=req.file;
    const userid=req.user.id;
    const name=req.user.name;
    const gpId=req.body.groupId;
    const filename=`Image${userid}/${new Date()}`
    const fileurl=await S3services.uploadToS3(file.buffer,filename);
    const response=await Message.create({
        name:name,
        message:fileurl,
        userId:userid,
        groupId:gpId,
        isImage:true
    })
    res.status(200).json({message:response});
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}
exports.getMessage=async(req,res)=>{
    try{
        const gpId=req.query.gpId
        const message=await Message.findAll({
            where:{groupId:gpId}
        })
        res.status(200).json({message:message});
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}