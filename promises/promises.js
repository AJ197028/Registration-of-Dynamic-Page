const posts = [
    { title: 'Post One', body: 'This post is one'},
    { title: 'Post Two', body: 'This post is two'},     
];

function getPost(){
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
            output += `<li> ${post.title} </li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            posts.push(post);
            const error = false;    //set true for display error

            if(!error){
                resolve();
            }
            else{
                reject("Error: Something went wrong");
            }
        }, 1000);
    });
}

createPost({title: 'Post Three', body:'This is post three'}).then(getPost).
catch((err) => console.log(err));           //all 3 post

//promise all
const promise1 = Promise.resolve('Hello World');
const promise2 = 10;
const promise3 = new Promise((resolve, reject) =>
    setTimeout(resolve, 2000,'Good Buy')
);

Promise.all([promise1,promise2,promise3]).then(values =>console.log(values));
        //['Hello World', 10, 'Good Buy'] after 2000 ms