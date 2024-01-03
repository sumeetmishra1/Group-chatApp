const Sequelize=require('sequelize');

const sequelize=new Sequelize(process.env.DB_NAME,process.env.SQL_USER_NAME,process.env.SQL_PASSWORD,{
    dialect:'mysql',
    host:process.env.DB_HOST,
})
module.exports=sequelize;