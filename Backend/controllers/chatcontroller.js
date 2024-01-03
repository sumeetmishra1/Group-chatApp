const Message=require('../models/chat');
exports.sendMessage=async(req,res,next)=>{
    try{
        const name=req.user.name;
        const message=req.body.message;
        const response=await Message.create({
        name:name,
        message:message
        })
        res.status(200).json({message:response})
    }
    catch(e){
        res.status(404).json({message:e.message});
    }
    
}
exports.getMessage=async(req,res)=>{
    try{
        const message=await Message.findAll()
        res.status(200).json({message:message});
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}