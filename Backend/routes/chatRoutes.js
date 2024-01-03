const express=require('express');
const router=express.Router();
const Auth=require('../middleware/authorization');
const chatcontroller=require('../controllers/chatcontroller');
router.post('/send-message',Auth.authenticate,chatcontroller.sendMessage);
module.exports=router;