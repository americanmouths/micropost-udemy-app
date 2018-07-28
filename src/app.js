import { http } from './http';

//Get posts on DOM load 
document.addEventListener('DOMContentLoaded', getPosts);

//Get posts function
function getPosts(){
  http.get('http://localhost:3000/posts')
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
}