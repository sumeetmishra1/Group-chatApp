const message=document.querySelector('#message-input');
const chatbox=document.querySelector('#chat-messages');
const groupname=document.querySelector('#groupname');
groupname.innerHTML=localStorage.getItem('groupname')
const socket = io();
const gpId=localStorage.getItem('gpId')
socket.on(`recieve-message${gpId}`,(details)=>{
    showmessage(details)
})
async function sendMessage(){
    let obj={
        message:message.value,
        gpId:localStorage.getItem('gpId')
    }
    const gpname=localStorage.getItem('groupname')
    const token=localStorage.getItem('token');
    const response=await axios.post('http://51.20.42.201:3000/chat/send-message',obj,{headers:{'Authorization':token}})
    const details=response.data.message
    console.log(details.message);
    showmessage(details);
    
    socket.emit('user-message',details);
    message.value="";
}
async function showmessage(details){
    const name=details.name;
    const message=details.message;
    if(details.isImage){
    const childHTML=`<p>${details.name}:<img src="${details.message}" class="chat-image"></p>`
    chatbox.innerHTML+=childHTML;
    }
    else{
    const childHTML=`<p>${name}:${message}</p>`
    chatbox.innerHTML+=childHTML;
    }
    
}
window.addEventListener("DOMContentLoaded",getMessage(),getgroup(),groupuserlist())
async function getMessage(){
    const token=localStorage.getItem('token');
    const gpId=localStorage.getItem('gpId');
   const response=await axios.get(`http://51.20.42.201:3000/chat/get-message?gpId=${gpId}`,{headers:{'Authorization':token}})
    for(var i=0;i<response.data.message.length;i++){
       showmessage(response.data.message[i]);
    }
    
}
async function getgroup(){
    const token=localStorage.getItem('token');
    const grouplist=document.querySelector('#allgroups');
    const response=await axios.get(`http://51.20.42.201:3000/group/getgroup`,{headers:{'Authorization':token}})
    for(var i=0;i<response.data.groups.length;i++){
        const gpname=response.data.groups[i].groupname
        const gpId=response.data.groups[i].groupId
        grouplist.innerHTML+=`<li><button id="${gpId}" onclick="intogroup('${gpname}',${gpId})">${gpname}</button></li>`
    }
}
function intogroup(gpname,gpId){
    localStorage.setItem('groupname',gpname);
    localStorage.setItem('gpId',gpId);
    location.reload();
    socket.emit('join-room', gpname)
}
async function addusertogroup(){
    try{
    const username=document.querySelector('#adduser');
    const token=localStorage.getItem('token');
    let obj={
        name:username.value,
        groupname:localStorage.getItem('groupname')
    }
    const user=await axios.post(`http://51.20.42.201:3000/group/addusertogroup`,obj,{headers:{'Authorization':token}})
    console.log(user.data.user)
    alert('User Added To Group')
    username.value="";
}
catch(e){
    console.log(e.message);
    alert(e.response.data.message);
}
}
async function groupuserlist(){
    try{
    const token=localStorage.getItem('token');
    const gpId=localStorage.getItem('gpId');
    const userlist=document.querySelector('#groupuserlist');
    const response=await axios.get(`http://51.20.42.201:3000/group/groupuser?gpId=${gpId}`,{headers:{'Authorization':token}})
    for(var i=0;i<response.data.users.length;i++){
        const username=response.data.users[i].name
        const Id=response.data.users[i].userId
        userlist.innerHTML+=`<li id="listid${Id}"><button onclick="GpUserOpt(${Id})">${username}</button></li>`
    }
}
    catch(e){
        console.log(e.message);
    }
}
function GpUserOpt(id){
    const userli=document.querySelector(`#listid${id}`)
    userli.innerHTML+=`<button onclick="makeadmin(${id})">+Admin</button><button onclick="removeuser(${id})">Remove</button>`
}
async function removeuser(id){
    try{
        const token=localStorage.getItem('token');
        const gpId=localStorage.getItem('gpId');
       const response= await axios.delete(`http://51.20.42.201:3000/group/removeuser?gpId=${gpId}&userId=${id}`,{headers:{'Authorization':token}})
       console.log(response);
       alert("User Removed From Group")
    }
   catch(e){
    console.log(e.message)
    alert(e.response.data.message)
   }
}
async function makeadmin(id){
    try{
        const token=localStorage.getItem('token');
        const gpId=localStorage.getItem('gpId');
        let obj={
            id:id,
            gpId:gpId
        }
       const response= await axios.post(`http://51.20.42.201:3000/group/makeuseradmin`,obj,{headers:{'Authorization':token}})
       console.log(response);
       alert(`${response.data.user.name} is now Admin`)
    }
    catch(e){
        console.log(e.message)
    alert(e.response.data.message)
    }
}
function showmultimediaoption(){
    const showmultimediaoption=document.querySelector('#hidden-multimedia')
    document.querySelector('#multimedia-option').innerHTML='&#215;'
    if(showmultimediaoption.style.display==='flex'){
        showmultimediaoption.style.display='none';
        document.querySelector('#multimedia-option').innerHTML='+'
    }
    else{
    showmultimediaoption.style.display='flex'
    }
}
async function uploadFile(){
    const multimediainput=document.querySelector('#multimedia-input');
    const multimediadata=multimediainput.files[0];
    const formData = new FormData();
    const gpId=localStorage.getItem('gpId');
    formData.append('groupId',gpId)
    formData.append('image',multimediadata);
    const token=localStorage.getItem('token');
    const response=await axios.post(`http://51.20.42.201:3000/chat/uploadFile`,formData,{headers:{'Authorization':token}})
    const details=response.data.message
    multimediainput.value="";
    showmultimediaoption();
    showmessage(details)
    socket.emit('user-message',details);
}
