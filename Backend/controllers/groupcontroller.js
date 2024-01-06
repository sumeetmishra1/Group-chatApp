const Group=require('../models/group');
const Usergroup=require('../models/usergroup');
const User=require('../models/newuser');
const sequelize=require('../utils/database');
exports.addgroup=async(req,res)=>{
   const t=await sequelize.transaction();
   try{
   const groupname=req.body.groupname;
   const response=await Group.create({
      groupname:groupname
   },{transaction:t})
   const usergroup=await Usergroup.create({
      groupname:groupname,
      name:req.user.name,
      userId:req.user.id,
      groupId:response.id,
      isAdmin:true
   },{transaction:t})
   await t.commit();
   res.status(200).json({group:response.groupname});
   }
   catch(e){
      await t.rollback();
      res.status(400).json({message:"error occured"});
   }
}
exports.getgroup=async(req,res)=>{
   try{
      const groups=await Usergroup.findAll({
         where:{userId:req.user.id},
         attributes:['groupname','groupId']
      })
      res.status(200).json({groups:groups})
   }
   catch(e){
      res.status(400).json({message:e});
   }
   
}
exports.addUserToGroup=async(req,res)=>{
   try{
      const groupname=req.body.groupname;
      const name=req.body.name;
      const admin=await Usergroup.findOne({where:{userId:req.user.id,groupname:groupname}});
      if(admin.isAdmin){
         const existinggroup=await Group.findOne({where:{groupname:groupname}});
         const existinguser=await User.findOne({where:{name:name}});
         if(!existinguser){
            return res.status(404).json({message:"User doesn't exists!"});
         }
         const usergroup=await Usergroup.create({
            groupname:groupname,
            name:name,
            userId:existinguser.id,
            groupId:existinggroup.id,
            isAdmin:false
         })
         res.status(200).json({user:usergroup});
      }
      else{
         res.status(401).json({message:"You are not Admin"});
      }
   }
   catch(e){
      res.status(400).json({e});
   }
}
exports.getUserOfGroup=async(req,res)=>{
   try{
      const gpId=req.query.gpId
      const users=await Usergroup.findAll({
         where:{groupId:gpId},
         attributes:['name','userId']
      })
      res.status(200).json({users:users})      
   }
   catch(e){
      res.status(400).json({e})   
   }
}
exports.removeUserFromGroup=async(req,res)=>{
   try{
   const adminId=req.user.id;
   const userId=req.query.userId;
   const groupId=req.query.gpId;
  const admin= await Usergroup.findOne({where:{userId:adminId,groupId:groupId}});
  if(admin.isAdmin){
   const user=await Usergroup.findOne({where:{userId:userId,groupId:groupId}});
   await user.destroy();
   res.status(200).json({user});
  }
  else{
   return res.status(401).json({message:"You are not admin!"});
  }
}
  catch(e){
   res.status(400).json({e})
  }
}
exports.makeUserAdmin=async(req,res)=>{
   const gpId=req.body.gpId;
   const userId=req.body.id;
   const admin=await Usergroup.findOne({where:{userId:req.user.id,groupId:gpId}});
   if(admin.isAdmin){
      const user=await Usergroup.findOne({where:{userId:userId,groupId:gpId}});
      if(user.isAdmin){
         return res.status(401).json({message:"User is already admin!"});
      }
      else{
      user.update({isAdmin:true});
      res.status(200).json({user});
      }
   }
   else{
      return res.status(401).json({message:"You are not admin!"});
   }
}