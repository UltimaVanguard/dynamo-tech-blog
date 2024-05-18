let id;
const modal = document.getElementById('comment');

const openModal = (event) => {
    id = event.target.getAttribute('data-btn-id');
    modal.style.display = "block";
}

const newComment = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#content-comment').value.trim();
  
    if (content) {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/posts/${id}`);
      } else {
        alert('Failed to add comment');
      }
    }
};

document
    .querySelector('.btn-modal')
    .addEventListener('click', openModal);

document
    .querySelector('.comment-form')
    .addEventListener('submit', newComment);

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } 