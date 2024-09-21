<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="microblogging.css">
    <title>Microblogging App</title>
</head>
<body>
    <header>
        <h1>Microblogging App</h1>
    </header>
    <main>
        <div id="login-form">
            <h2>Login</h2>
            <input type="text" id="username" placeholder="Username" aria-label="Username" required>
            <input type="password" id="password" placeholder="Password" aria-label="Password" required> <!-- Added password input -->
            <button id="login-btn">Login</button>
        </div>
        <div id="user-dashboard" style="display: none;">
            <h2>Welcome, <span id="user-username"></span>!</h2>
            <textarea id="post-content" placeholder="Write your post..."></textarea>
            <button id="post-btn">Post</button>
            <button id="logout-btn">Logout</button>
        </div>
        <div id="feed">
            <h2>Feed</h2>
            <ul id="post-list"></ul>
        </div>
    </main>
    <script src="microblogging.js"></script>
</body>
</html>


body {
font-family: Arial, sans-serif;
}
header {
background-color: #333;
color: #fff;
text-align: center;
padding: 1rem;
}
main {
max-width: 800px;
margin: 0 auto;
padding: 2rem;
}
#restaurant-list, #menu, #order-confirmation {
margin-bottom: 2rem;
}
#restaurant-list h2, #menu h2, #order-confirmation h2 {
margin-bottom: 1rem;
}
ul {
list-style-type: none;
padding-left: 0;
}
li {
border: 1px solid #ddd;
padding: 1rem;
margin-bottom: 1rem;
cursor: pointer;
}
button {
background-color: #333;
color: #fff;
border: none;
padding: 0.5rem 1rem;
cursor: pointer;
}


const restaurantList = document.getElementById('restaurant-list');
const restaurants = document.getElementById('restaurants');
const menu = document.getElementById('menu');
const restaurantName = document.getElementById('restaurant-name');
const itemsList = document.getElementById('items');
const orderButton = document.getElementById('order-btn');
const orderConfirmation = document.getElementById('order-confirmation');
const orderSummary = document.getElementById('order-summary');
const restaurantsData = [
{ name: 'Restaurant A', menu: ['Item 1', 'Item 2', 'Item 3'] },
{ name: 'Restaurant B', menu: ['Item 4', 'Item 5', 'Item 6'] },
// Add more restaurants and menu items
];
// Display list of restaurants
function displayRestaurants() {
restaurantsData.forEach((restaurant, index) => {
const restaurantItem = document.createElement('li');
restaurantItem.textContent = restaurant.name;
restaurantItem.addEventListener('click', () => {
showMenu(index);
});
restaurants.appendChild(restaurantItem);
});
}
// Display menu items for the selected restaurant
function showMenu(index) {
restaurantList.style.display = 'none';
menu.style.display = 'block';
const selectedRestaurant = restaurantsData[index];
restaurantName.textContent = selectedRestaurant.name;
itemsList.innerHTML = '';
selectedRestaurant.menu.forEach(item => {
const menuItem = document.createElement('li');
menuItem.textContent = item;
itemsList.appendChild(menuItem);
});
orderButton.addEventListener('click', () => {
showOrderConfirmation(selectedRestaurant.name);
});
}
// Display order confirmation
function showOrderConfirmation(restaurantName) {
menu.style.display = 'none';
orderConfirmation.style.display = 'block';
orderSummary.textContent = `Your order from ${restaurantName} has been placed!`;
}
// Initial setup
displayRestaurants();
