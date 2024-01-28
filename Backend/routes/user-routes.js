const express=require('express');
const usercontroller=require('../controllers/user-controller');
const app=express();
const router=express.Router();
router.post('/add-user',usercontroller.addNewUser);
router.post('/login-user',usercontroller.loginuser);
module.exports=router;
