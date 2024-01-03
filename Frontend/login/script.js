const form=document.querySelector('#loginform')
const submitbtn=document.querySelector('#submitbtn');
const email=document.querySelector('#email')
const password=document.querySelector('#password')
form.addEventListener('submit',loginuser)
async function loginuser(e){
    try{
    e.preventDefault();
    const obj={
        email:email.value,
        password:password.value
    }
    const User=await axios.post('http://localhost:3000/user/loginuser',obj)
    localStorage.setItem('token',User.data.token);
    alert("User Logged in!");
    console.log(obj)
    form.reset();
    window.location.href="../chatscreen/index.html"
}
catch(e){
    const childhtml=`<h3>${e.response.data.message}</h3>`;
        form.innerHTML+=childhtml;
        console.log(e);
        setTimeout(()=>{
            location.reload()
        },3000);
}
}