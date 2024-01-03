const User=require('../models/newuser');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
function createToken(id,name){
   return jwt.sign({id:id,name:name},process.env.JWT_KEY);
}
exports.addNewUser=async(req,res)=>{
    try{
    const name=req.body.name;
    const phone=req.body.phone;
    const email=req.body.email;
    const password=req.body.password;
    const existinguser= await User.findAll({where:{email:email}});
    if(existinguser.length>0){
        res.status(400).json({err:"User Already Exists!"});
    }
    else{
        const saltrounds=10;
        bcrypt.hash(password,saltrounds,async(err,hash)=>{
            const user = await User.create({
                name:name,
                phone:phone,
                email:email,
                password:hash
            })
            res.status(200).json({newuser:user});
        })
        }
    }
   
    catch(e){
        res.status(400).json({err:e.message});
    }
    
    
}
exports.loginuser=async(req,res)=>{
    try{
    const email=req.body.email;
    const password=req.body.password;
    const user= await User.findAll({where:{email:email}})
    if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(err){
                res.status(500).json({message:"Something went Wrong"});
            }
            else if(result==true){
                res.status(200).json({message:"User Login Sucessfull!",token:createToken(user[0].id,user[0].name)});
            }
            else{
                res.status(401).json({message:"Password is incorrect"});
            }
        })
    }else{
        res.status(404).json({message:"User Not found!"})
    }
    }
catch(e){
    res.status(500).json({message:"Something went Wrong"});
}
}