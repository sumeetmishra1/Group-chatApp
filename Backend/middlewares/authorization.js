const jwt=require('jsonwebtoken');
const User=require('../models/user');
exports.authenticate=async(req,res,next)=>{
    const token= req.header('Authorization');
    const user= jwt.verify(token,process.env.JWT_KEY,);
    User.findByPk(user.id)
    .then(user=>{
        console.log(user.id)
        req.user=user;
        next();
    })
    .catch(err=>{throw new Error(err)});
}