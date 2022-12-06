
function saveToCloudStorage(event){

  event.preventDefault();
  const name = event.target.username.value;
  const email = event.target.emailid.value;
  const phonenumber = event.target.phonenumber.value
  const obj = {
    name,
    email,
    phonenumber
  }

  //post on cloud
  axios.post("https://crudcrud.com/api/15131715ec47405d835f73552bfc4fda/appointmentData",obj)

    .then((response) => {
      showNewUserOnScreen(response.data)  //show on screen
      //console.log(response)   //save detail of user to crudcrud ie cloud istead of local
    })
    .catch((err) =>{
      document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
      console.log(err)
    })
}

//Hold all user details after page refresh from cloud ie crud crud
window.addEventListener("DOMContentLoaded", () =>{

  axios.get("https://crudcrud.com/api/15131715ec47405d835f73552bfc4fda/appointmentData")
    .then((response) =>{
      console.log(response)
      for(var i=0; i < response.data.length; i++ ){
        showNewUserOnScreen(response.data[i])
      }
    })
    .catch((err) =>{
      console.log(err)
    })
})

//show all user details
function showNewUserOnScreen(user){
  //while fetching from cloud id will also get fetch so that we can use in our program
  //so our unique key is cloud generated _id instead of emailid

  // clear field after submiting
  document.getElementById('emailid').value = '';
  document.getElementById('username').value = '';
  document.getElementById('phonenumber').value ='';

  const parentNode = document.getElementById('listofUsers');
  const childHtML = `<li id = ${user._id}> ${user.name} - ${user.email} - ${user.phonenumber} 
                    <button onclick = editUserDetails('${user.email}','${user.name}','${user.phonenumber}','${user._id}')>Edit</button>
                    <button onclick = deleteUser('${user._id}')>Delete</button>
                    </li>`
  parentNode.innerHTML = parentNode.innerHTML+childHtML;

  }  

//DELETE USER FROM LOCAL STORAGE
function deleteUser(userId){

  axios.delete(`https://crudcrud.com/api/15131715ec47405d835f73552bfc4fda/appointmentData/${userId}`)
    .then((response) =>{
      console.log(response)
      removeUserFromScreen(userId)
    })
    .catch((err) =>{
      console.log(err)
    })  
}

//DELETE USER FROM SCREEN
function removeUserFromScreen(userId){
  const parentNode = document.getElementById('listofUsers');
  const childNodeToBeDeleted = document.getElementById(userId);
  parentNode.removeChild(childNodeToBeDeleted);
}

//EDIT USER
function editUserDetails(emailId, name, phonenumber, userId){
  document.getElementById('emailid').value = emailId;
  document.getElementById('username').value = name;
  document.getElementById('phonenumber').value = phonenumber ;

  deleteUser(userId);
}