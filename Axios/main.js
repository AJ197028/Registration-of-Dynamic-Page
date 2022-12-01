//AXIOS GLOBAL
axios.defaults.headers.common['X-Auth-Token'] =   //site jwt.io --real token which can be used
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';  
// this token can be validate on server
//this token is in all request

// GET REQUEST
function getTodos() {
  // axios({
  //   method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',   //backend
  //   params: {
  //     _limit: 5         //form limiting only 5 data
  //   }
  // })
  // .then(res => showOutput(res))
  // //.then(res => console.log(res))       
  // .catch(err => console.log(err))
  axios
  .get('https://jsonplaceholder.typicode.com/todos?_limit=5',{ timeout: 5000})  //show error for lowtime ex 5ms   
  .then(res => showOutput(res))
  //.then(res => console.log(res))       
  .catch(err => console.log(err))
}

// POST REQUEST
function addTodo() {
  // axios({
  //   method: 'post',
  //   url: 'https://jsonplaceholder.typicode.com/todos',   
  //   //we are adding data
  //   data: {
  //     title: 'New todo',
  //     completed: false
  //   }
  // })
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    title: 'New Todo',
    completed: false
  })
  .then(res => showOutput(res))       
  .catch(err => console.log(err))
}

// PUT/PATCH REQUEST
//give the id of data needed to be updated
//put will replace the whole data user id is no more
//while by patch will work link normal update
function updateTodo() {
  //put
  // axios.
  //   put('https://jsonplaceholder.typicode.com/todos/1',{
  //   title: 'Updated Todo',
  //   completed: true
  // })
  axios.
    patch('https://jsonplaceholder.typicode.com/todos/1',{
    title: 'Updated Todo',
    completed: true
  })
  .then(res => showOutput(res))       
  .catch(err => console.log(err))
}

// DELETE REQUEST
function removeTodo() {
  axios.
  delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => showOutput(res))       
  .catch(err => console.log(err))
}

// SIMULTANEOUS DATA
function getData() {  
  axios.
  all([ axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
])
  .then(axios.spread((todos,posts) => showOutput(posts)))       
  .catch(err => console.log(err))
}

// CUSTOM HEADERS
//to send data in header so to use like login
function customHeaders() {
  const config = {
    headers: { 
      'Content-Type': 'application/jason',
      Authorization: 'some token'
    }
  }

  axios.post('https://jsonplaceholder.typicode.com/todos',{
    title: 'New Todo',
    completed: false
  })
  .then(res => showOutput(res))       
  .catch(err => console.log(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const option = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title:  'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data=>{
      data.title = data.title.toUpperCase();
      return data;
    })
  }
  axios(option).then( res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios
   .get('https://jsonplaceholder.typicode.com/todoss',{
  //   validStatus: function(status){
  //     return status < 500 //reject for status greater/equal to 500
  //      }
  })   
  .then(res => showOutput(res))
  //.then(res => console.log(res))       
  .catch(err => {
    if(err.response){
      //Server responsded with status other than 200 range
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);

      if(err.response.status === 404){
        alert('Error: Page not found ')
      }
    }else if(err.request){
      //Request was made but no response
      console.log(err.request);
    }else{
      console.log(err.message);
    }
  })
}

// CANCEL TOKEN
function cancelToken() {
  const source =  axios.CancelToken.source();

  axios
  .get('https://jsonplaceholder.typicode.com/todos',{
    cancelToken: source.token
  })   
  .then(res => showOutput(res))
  .catch(thrown =>{
    if(axios.isCancel(thrown)){
      console.log('Request Canceled', thrown.message)
    }
  });
  if(true){
    source.cancel('Request canceled !');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {
  console.log( `${config.method.toUpperCase()} request sent to
  ${config.url} at ${new Date().getTime()}` );
  return config;
},error => {
  return promise.reject(error)
})

// AXIOS INSTANCES
const axiosInstance = axios.create({
  //other custom settings 
  baseURL: 'https://jsonplaceholder.typicode.com'
})
//axiosInstance.get('/comments').then(res => showOutput(res)); //show all comments

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
