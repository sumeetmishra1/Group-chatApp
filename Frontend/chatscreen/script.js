
const message=document.querySelector('#message-input');
const chatbox=document.querySelector('#chat-messages');
async function sendMessage(){
    let obj={
        message:message.value
    }
    const token=localStorage.getItem('token');
    const response=await axios.post('http://localhost:3000/chat/send-message',obj,{headers:{'Authorization':token}})
    const details=response.data.message
    console.log(details.message);
    showmessage(details);
    message.value="";
}
async function showmessage(details){
    const name=details.name;
    const message=details.message;
    const childHTML=`<p>${name}:${message}</p>`
    chatbox.innerHTML+=childHTML;
}
window.addEventListener("DOMContentLoaded",getMessage())
async function getMessage(){
    const token=localStorage.getItem('token');
    const response=await axios.get('http://localhost:3000/chat/get-message',{headers:{'Authorization':token}})
    for(var i=0;i<response.data.message.length;i++){
       showmessage(response.data.message[i]);
    }
}