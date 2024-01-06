const express=require('express');
const path = require('path');
const cors=require('cors');
require('dotenv').config();
const bodyparser=require('body-parser');
const app=express();
const Message=require('./models/chat');
const Group=require('./models/group')
const User=require('./models/newuser');
const usergroup=require('./models/usergroup');
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

User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group,{through:usergroup});
Group.belongsToMany(User,{through:usergroup});

Group.hasMany(Message);
Message.belongsTo(Group);

sequelize.sync().then(res=>{
    app.listen(3000);
    console.log("app runs")
}).catch(err=>console.log(err));