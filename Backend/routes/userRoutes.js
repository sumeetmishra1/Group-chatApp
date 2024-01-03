const express=require('express');
const usercontroller=require('../controllers/usercontroller');
const app=express();
const router=express.Router();
router.post('/addnewuser',usercontroller.addNewUser);
router.post('/loginuser',usercontroller.loginuser);
module.exports=router;
