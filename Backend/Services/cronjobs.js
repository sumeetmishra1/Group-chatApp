const cron=require('node-cron');
const {Op} = require('sequelize');
const Message=require('../models/chat');
const Archivechat=require('../models/archivedchats');
exports.job=cron.schedule('0 1 * * *',async () => {
    try{
        const oneDayAgoDate=new Date();
        oneDayAgoDate.setDate(oneDayAgoDate.getDate()-1);
        const chat=await Message.findAll({
            where:{
                createdAt:{
                    [Op.lte]:oneDayAgoDate
                }
            }
        })
        await Archivechat.bulkCreate(
            chat.map((msg)=>({
                name:msg.name,
                message:msg.message,
                userId:msg.userId,
                groupId:msg.groupId,
                isImage:msg.isImage
            }))
        )
        await Message.destroy({
            where:{
                createdAt:{
                    [Op.lte]:oneDayAgoDate
                }
            }
        });
        console.log(`Archive done of chats ${oneDayAgoDate}`);
    }
    catch(e){
        console.error('Error archiving old records:', error);
    }
  },{
    timezone: "Asia/Kolkata",
  });