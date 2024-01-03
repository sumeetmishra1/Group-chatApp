const Group=require('../models/group')
exports.addgroup=async(req,res)=>{
   try{
   const groupname=req.body.groupname;
   const response=await Group.create({
      groupname:groupname
   })
   res.status(200).json({group:response.groupname});
   }
   catch(e){
      res.status(400).json({message:"error occured"});
   }
}