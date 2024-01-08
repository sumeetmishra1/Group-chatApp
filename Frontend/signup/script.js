const form=document.querySelector('#signupform')
const submitbtn=document.querySelector('#submitbtn');
const username=document.querySelector('#username')
const phone=document.querySelector('#phone')
const email=document.querySelector('#email')
const password=document.querySelector('#password')
form.addEventListener('submit',addnewuser)
async function addnewuser(e){
    e.preventDefault();
    try{
        const obj={
            name:username.value,
            phone:phone.value,
            email:email.value,
            password:password.value
        }
        const user=await axios.post('http://51.20.42.201:3000/user/addnewuser',obj)
        console.log(user)
        form.reset();
        window.alert("User Creted Succesfully!")
        location.href='/login/index.html'
    }
    catch(e){
        const childhtml=`<h3>${e.response.data.err}</h3>`;
        form.innerHTML+=childhtml;
        console.log(e);
        setTimeout(()=>{
            location.reload()
        },3000);
    }
    
}