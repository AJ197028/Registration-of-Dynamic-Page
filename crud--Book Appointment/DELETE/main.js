function saveToLocalStorage(event){
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
  axios.post("https://crudcrud.com/api/83b85d8499f040e7884ea8f2e2024127/appointmentData",obj)
    .then((response) => {
      showNewUserOnScreen(response.data)  //show on screen
      //console.log(response)   //save detail of user to crudcrud ie cloud istead of local
    })
    .catch((err) =>{
      document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
      console.log(err)
    })

  // Setting unique key as email

  //localStorage.setItem(obj.email, JSON.stringify(obj)); 
  //showNewUserOnScreen(obj);

  
}


//Hold all user details after page refresh from cloud ie crud crud

window.addEventListener("DOMContentLoaded", () =>{
  axios.get("https://crudcrud.com/api/83b85d8499f040e7884ea8f2e2024127/appointmentData")
    .then((response) =>{
      console.log(response)
      for(var i=0; i < response.data.length; i++ ){
        showNewUserOnScreen(response.data[i])
      }
    })
    .catch((err) =>{
      console.log(err)
    })
    
  // const localStorageObj = localStorage;                   //contain all storage data          
  // const localStorageKeys = Object.keys(localStorageObj);  //keys  
  
  // for(var i=0; i<localStorageKeys.length; i++){
  //   const key = localStorageKeys[i];                      //show all emailid
    
  //   userDetailString =  localStorageObj[key];             //every user details as string     
  //   userDetailObj = JSON.parse(userDetailString)          //every user details as object            
     
  //   showNewUserOnScreen(userDetailObj);
  // }
})

//show all user details
function showNewUserOnScreen(user){
  //while fetching from cloud id will also get fetch so that we can use in our program
  //so our unique key is cloud generated _id instead of emailid
    // user = {
    //   _id:
    //   name:
    //   email:
    //   phonenumber
    // }

    // clear field after submiting
    document.getElementById('emailid').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phonenumber').value ='';
    // console.log(localStorage.getItem(user.emailId))
  
    const parentNode = document.getElementById('listofUsers');
    const childHtML = `<li id = ${user._id}> ${user.name} - ${user.email} - ${user.phonenumber} 
                      <button onclick = editUserDetails('${user._id}','${user.name}','${user.phonenumber}')>Edit</button>
                      <button onclick = deleteUser('${user._id}')>Delete</button>
                      </li>`
    parentNode.innerHTML = parentNode.innerHTML+childHtML;

  }  

//DELETE USER FROM LOCAL STORAGE
function deleteUser(userId){
  axios.delete(`https://crudcrud.com/api/83b85d8499f040e7884ea8f2e2024127/appointmentData/${userId}`)
    .then((response) =>{
      console.log(response)
      removeUserFromScreen(userId)
    })
    .catch((err) =>{
      console.log(err)
    })  
  // console.log(emailid)
  // localStorage.removeItem(emailid);                      //remove user from local
  // removeUserFromScreen(emailid);                         //to remove from screen also
}

//DELETE USER FROM SCREEN
function removeUserFromScreen(userId){
  const parentNode = document.getElementById('listofUsers');
  const childNodeToBeDeleted = document.getElementById(userId);
  parentNode.removeChild(childNodeToBeDeleted);
}

//EDIT USER
function editUserDetails(emailid, name, phonenumber){
  document.getElementById('emailid').value = emailid;
  document.getElementById('username').value = name;
  document.getElementById('phonenumber').value = phonenumber ;

  deleteUser(emailid);
}