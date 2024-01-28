const Sequelize=require('sequelize');
const sequelize=require('../utils/database');
const ArchivedMessage=sequelize.define('archivedmessage',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:Sequelize.STRING,
    message:Sequelize.STRING,
    isImage:{
       type: Sequelize.BOOLEAN,
       defaultValue:false
    }
})
module.exports=ArchivedMessage