const express=require('express');
const router=express.Router();
const Auth=require('../middleware/authorization');
const groupcontroller=require('../controllers/groupcontroller');
router.post('/add-group',Auth.authenticate,groupcontroller.addgroup)




module.exports=router;