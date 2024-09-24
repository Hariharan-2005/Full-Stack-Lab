document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-btn');
    const userDashboard = document.getElementById('user-dashboard');
    const userUsername = document.getElementById('user-username');
    const postContent = document.getElementById('post-content');
    const postButton = document.getElementById('post-btn');
    const logoutButton = document.getElementById('logout-btn');
    const postList = document.getElementById('post-list');
    let currentUser = null;

    const correctPassword = 'password'; // Set your password here

    // Event listener for login button
    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (username !== '' && password === correctPassword) {
            currentUser = username;
            localStorage.setItem('currentUser', username);
            loginForm.style.display = 'none';
            userDashboard.style.display = 'block';
            userUsername.textContent = username;
            loadPosts();
        } else {
            alert('Invalid username or password.');
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
            const { date, time } = getCurrentDateTime();
            const post = {
                username: currentUser,
                content: content,
                date: date,
                time: time,
                likes: 0,
                dislikes: 0,
                comments: []
            };
            savePost(post);
            postContent.value = '';
            loadPosts();
        } else {
            alert('Post content cannot be empty.');
        }
    });

    // Event listener for logout button
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        loginForm.style.display = 'block';
        userDashboard.style.display = 'none';
        userUsername.textContent = '';
        currentUser = null;

        // Clear the feed
        postList.innerHTML = '';
        localStorage.removeItem('posts');
    });

    // Function to format the current date and time
    function getCurrentDateTime() {
        const now = new Date();
        return {
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString()
        };
    }

    // Function to save post to local storage
    function savePost(post) {
        try {
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts = posts.filter(p => !(p.username === post.username && p.content === post.content));
            posts.push(post);
            localStorage.setItem('posts', JSON.stringify(posts));
        } catch (error) {
            console.error('Failed to save post:', error);
        }
    }

    // Function to load posts from local storage
    function loadPosts() {
        try {
            postList.innerHTML = ''; // Clear existing posts
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.forEach(post => createPostItem(post));
        } catch (error) {
            console.error('Failed to load posts:', error);
        }
    }

    // Function to create a new post item
    function createPostItem(post) {
        const postItem = document.createElement('li');
        postItem.className = 'post-item';

        const postMeta = document.createElement('div');
        postMeta.className = 'post-meta';
        postMeta.textContent = `${post.date} - ${post.time}`;
        postItem.appendChild(postMeta);

        const postText = document.createElement('p');
        postText.innerHTML = `<strong>${post.username}</strong>: ${post.content}`;
        postItem.appendChild(postText);

        const likeButton = document.createElement('button');
        likeButton.textContent = `Like (${post.likes || 0})`;
        likeButton.className = 'like-button';
        likeButton.onclick = () => {
            post.likes = (post.likes || 0) + 1;
            savePost(post);
            loadPosts();
        };
        postItem.appendChild(likeButton);

        // Add Dislike Button
        const dislikeButton = document.createElement('button');
        dislikeButton.textContent = `Dislike (${post.dislikes || 0})`;
        dislikeButton.className = 'dislike-button';
        dislikeButton.onclick = () => {
            post.dislikes = (post.dislikes || 0) + 1;
            savePost(post);
            loadPosts();
        };
        postItem.appendChild(dislikeButton);

        // Comment section
        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';

        // Display existing comments
        if (post.comments) {
            post.comments.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.className = 'comment';
                commentItem.textContent = comment;
                commentSection.appendChild(commentItem);
            });
        }

        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Add a comment...';
        commentSection.appendChild(commentInput);

        const commentButton = document.createElement('button');
        commentButton.textContent = 'Comment';
        commentButton.onclick = () => {
            const comment = commentInput.value.trim();
            if (comment) {
                post.comments = post.comments || [];
                post.comments.push(comment);
                savePost(post);
                loadPosts();
            } else {
                alert('Comment cannot be empty.');
            }
        };
        commentSection.appendChild(commentButton);

        postItem.appendChild(commentSection);
        postList.appendChild(postItem);
    }

    // Load posts on page load
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = storedUser;
        loginForm.style.display = 'none';
        userDashboard.style.display = 'block';
        userUsername.textContent = currentUser;
        loadPosts();
    }
});
