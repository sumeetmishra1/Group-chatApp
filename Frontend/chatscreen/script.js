const message=document.querySelector('#message-input');
const chatbox=document.querySelector('#chat-messages');
async function sendMessage(){
    let obj={
        message:message.value
    }
    const token=localStorage.getItem('token');
    const response=await axios.post('http://localhost:3000/chat/send-message',obj,{headers:{'Authorization':token}})
    const details=response.data.message
    console.log(details);
    showmessage(details);
    message.value="";
}
async function showmessage(details){
    const name=details.name;
    const message=details.message;
    const childHTML=`<p>${name}:${message}</p>`
    chatbox.innerHTML+=childHTML;
}