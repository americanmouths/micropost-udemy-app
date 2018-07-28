import { http } from './http';
import { ui } from './ui';

//Get posts on DOM load 
document.addEventListener('DOMContentLoaded', getPosts);

//Get posts function
function getPosts(){
  http.get('http://localhost:3000/posts')
    .then(posts => ui.showPosts(posts))
    .catch(err => console.log(err))
}