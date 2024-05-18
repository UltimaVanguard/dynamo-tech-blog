let updateId;
let modal = document.getElementById('update');
let updTitle = document.getElementById('title-update');
let updContent = document.getElementById('content-update');

const openModal = async (event) => {
  if (event.target.hasAttribute('data-upd-id')) {
    updateId = event.target.getAttribute('data-upd-id');

    const response = await fetch(`/post/${updateId}`, {
      method: 'GET'
    });

    if (response.ok) {
      const result = await response.json();
      updTitle.value = result.title;
      updContent.value =  result.content;
    } else {
      alert('Failed to retrieve data');
      document.location.replace('/dashboard');
    }

    modal.style.display = 'block';
  }
}

const deletePost = async (event) => {
  if (event.target.hasAttribute('data-del-id')) {
    const id = event.target.getAttribute('data-del-id');

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};

const updatePost = async (event) => {
  event.preventDefault();

  const title = updTitle.value.trim();
  const content = updContent.value.trim();
  
  if (title && content) {
    const response = await fetch(`/api/posts/${updateId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update');
    }
  } else {
    alert('Please fill out form!');
  };
};

document
  .querySelector('.blog-cards')
  .addEventListener('click', openModal);

document
  .querySelector('.blog-cards')
  .addEventListener('click', deletePost);

document
  .querySelector('.update-form')
  .addEventListener('submit', updatePost);

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 