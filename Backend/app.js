const express=require('express');
const path = require('path');
const cors=require('cors');
require('dotenv').config();
const bodyparser=require('body-parser');
const app=express();
const userroutes=require('./routes/userRoutes');
const grouproutes=require('./routes/groupRoutes')
const chatroutes=require('./routes/chatRoutes');
const sequelize=require('./utils/database')
app.use(cors());
app.use(bodyparser.json({extended:false}));
app.use('/chat',chatroutes);
app.use('/group',grouproutes)
app.use('/user',userroutes)
app.use((req,res)=>{
    if(req.url==='/'){
    res.sendFile(path.join(__dirname,`../Frontend/frontintro/index.html`));
    }
    else{
    res.sendFile(path.join(__dirname,`../Frontend/${req.url}`));
    }
})
sequelize.sync().then(res=>{
    app.listen(3000);
}).catch(err=>console.log(err));