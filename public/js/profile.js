const deletePost = async (event) => {
    const id = event.target.getAttribute('data-btn-id');

    console.log(`${id} HELLLLLLOOOOO`)
  
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }

};

document
  .querySelector('.btn-danger')
  .addEventListener('click', deletePost);