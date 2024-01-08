const express=require('express');
const path = require('path');
const http=require('http');//for socket
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
const server=http.createServer(app);
const { Server } = require("socket.io");
const io=new Server(server,{

});

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

//socket
io.on('connection',(socket)=>{
    console.log(socket.id)
    socket.on('user-message',(details)=>{
        socket.broadcast.emit(`recieve-message${details.groupId}`,details);
    })
    socket.on('join-room',(room)=>{
        socket.join(room)
    })
})

sequelize.sync().then(res=>{
    server.listen(3000);
}).catch(err=>console.log(err))

