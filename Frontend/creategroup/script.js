const form=document.querySelector('#creategroup');
const groupname=document.querySelector('#groupname');
form.addEventListener('submit',creategroup)
async function creategroup(e){
    e.preventDefault();
    try{
        let obj={
            groupname:groupname.value
        }
        const token=localStorage.getItem('token');
        const response=await axios.post('http://localhost:3000/group/add-group',obj,{headers:{'Authorization':token}})
        console.log(response.data.group);
        alert(`${response.data.group} succesfully created`)
        form.reset();
        location.href='/chatscreen/index.html'
    }
    catch(e){
        console.log(e.message);
        alert(e.message);
    }

}