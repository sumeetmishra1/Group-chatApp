const Sequelize=require('sequelize');
const sequelize=require('../utils/database');
const usergroup=sequelize.define('usergroup',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:Sequelize.STRING,
    groupname:Sequelize.STRING,
    isAdmin:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull:false
    }

})
module.exports=usergroup;