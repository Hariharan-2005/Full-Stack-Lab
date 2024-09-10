document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form'); 
    const usernameInput = document.getElementById('username');
    const loginButton = document.getElementById('login-btn');
    const userDashboard = document.getElementById('user-dashboard');
    const userUsername = document.getElementById('user-username'); 
    const postContent = document.getElementById('post-content'); 
    const postButton = document.getElementById('post-btn');
    const postList = document.getElementById('post-list');
    let currentUser = null;
  
    // Event listener for login button 
    loginButton.addEventListener('click', () => {
      const username = usernameInput.value.trim();
      if (username !== '') {
        currentUser = username; 
        localStorage.setItem('currentUser', username); // Save user to localStorage
        loginForm.style.display = 'none'; 
        userDashboard.style.display = 'block'; 
        userUsername.textContent = username;
        loadPosts();
      }
    });
  
    // Event listener for post button 
    postButton.addEventListener('click', () => {
      if (!currentUser) {
        alert('You must log in to post.');
        return;
      }
  
      const content = postContent.value.trim();
      if (content !== '') {
        const post = {
          username: currentUser,
          content: content
        };
        savePost(post); 
        postContent.value = '';
        loadPosts();
      } else {
        alert('Post content cannot be empty.');
      }
    });
  
    // Save post to local storage
    function savePost(post) {
      try {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
      } catch (error) {
        console.error('Failed to save post:', error);
      }
    }
  
    // Load posts from local storage
    function loadPosts() {
      try {
        postList.innerHTML = '';
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => {
          const postItem = document.createElement('li');
          postItem.innerHTML = `<p><strong>${post.username}</strong>: ${post.content}</p>`;
          postList.appendChild(postItem);
        });
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    }
  
    // Initial setup
    if (localStorage.getItem('posts') === null) {
      localStorage.setItem('posts', JSON.stringify([]));
    }
  
    // Check if user is logged in on page load
    const savedUsername = localStorage.getItem('currentUser');
    if (savedUsername) {
      currentUser = savedUsername;
      loginForm.style.display = 'none'; 
      userDashboard.style.display = 'block'; 
      userUsername.textContent = currentUser;
      loadPosts();
    }
  });
  