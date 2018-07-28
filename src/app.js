import { http } from './http';
import { ui } from './ui';

//Get posts on DOM load 
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Listen for delete post 
document.querySelector('#posts').addEventListener('click', deletePost);

//Update for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

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

//Delete post 
function deletePost(e) {
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
            ui.showAlert('Post removed', 'alert alert-success');
            getPosts();
        })
        .catch(err => console.log(err));
      }
    }
     e.preventDefault();
 }

 //Edit post 
 function enableEdit(e){
  if (e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
  
    const data = {
      id: id,
      title: title,
      body: body
    }

    //Film form with current post 
    ui.fillForm(data);
  }
  e.preventDefault();
 }