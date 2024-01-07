const Sequelize=require('sequelize');
const sequelize=require('../utils/database');
const Message=sequelize.define('message',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:Sequelize.STRING,
    message:Sequelize.STRING,
    fileUrl:Sequelize.STRING
})
module.exports=Message