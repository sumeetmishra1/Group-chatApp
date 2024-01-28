const express=require('express');
const router=express.Router();
const Auth=require('../middlewares/authorization');
const groupcontroller=require('../controllers/group-controller');
router.post('/add-group',Auth.authenticate,groupcontroller.addgroup);
router.get('/get-group',Auth.authenticate,groupcontroller.getgroup);
router.post('/add-user-to-group',Auth.authenticate,groupcontroller.addUserToGroup);
router.get('/group-user',Auth.authenticate,groupcontroller.getUserOfGroup);
router.delete('/remove-user',Auth.authenticate,groupcontroller.removeUserFromGroup);
router.post('/make-user-admin',Auth.authenticate,groupcontroller.makeUserAdmin);
module.exports=router;