import { http } from './http';
import { ui } from './ui';

//Get posts on DOM load 
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Get posts function
function getPosts(){
  http.get('http://localhost:3000/posts')
    .then(posts => ui.showPosts(posts))
    .catch(err => console.log(err))
}

//Add new post function

function submitPost(){
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;

  const data = {
    title: title,
    body: body
  }

  //Make POST req
  http.post('http://localhost:3000/posts', data)
    .then(post => {
      ui.showAlert('Post added!', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err));

}
