const restaurantList = document.getElementById('restaurant-list');
const restaurants = document.getElementById('restaurants');
const menu = document.getElementById('menu');
const restaurantName = document.getElementById('restaurant-name');
const itemsList = document.getElementById('items');
const orderButton = document.getElementById('order-btn');
const orderConfirmation = document.getElementById('order-confirmation');
const orderSummary = document.getElementById('order-summary');

const restaurantsData = [
    { name: 'KFC', logo: 'https://example.com/kfc-logo.png', menu: ['Original Recipe Chicken', 'Hot Wings', 'Popcorn Chicken'] },
    { name: 'Burger King', logo: 'https://example.com/burger-king-logo.png', menu: ['Whopper', 'Chicken Fries', 'Onion Rings'] },
    { name: 'Popeyes', logo: 'https://example.com/popeyes-logo.png', menu: ['Chicken Sandwich', 'Cajun Fries', 'Biscuits'] },
    { name: "Domino's", logo: 'https://example.com/dominos-logo.png', menu: ['Pepperoni Pizza', 'Cheese Pizza', 'Chicken Wings'] },
    { name: "McDonald's", logo: 'https://example.com/mcdonalds-logo.png', menu: ['Big Mac', 'French Fries', 'McChicken'] },
    { name: "Pizza Hut", logo: 'https://example.com/pizza-hut-logo.png', menu: ['Pan Pizza', 'Stuffed Crust', 'Breadsticks'] },
];

// Display list of restaurants
function displayRestaurants() {
    restaurantsData.forEach((restaurant, index) => {
        const restaurantItem = document.createElement('li');
        
        const logoImg = document.createElement('img');
        logoImg.src = restaurant.logo; // Set logo source
        logoImg.alt = `${restaurant.name} Logo`;
        logoImg.style.width = '30px'; // Adjust size
        logoImg.style.marginRight = '10px'; // Space between image and text

        restaurantItem.appendChild(logoImg);
        restaurantItem.appendChild(document.createTextNode(restaurant.name));
        
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
    
    orderButton.onclick = () => {
        showOrderConfirmation(selectedRestaurant.name);
    };
}

// Display order confirmation
function showOrderConfirmation(restaurantName) {
    menu.style.display = 'none';
    orderConfirmation.style.display = 'block';
    orderSummary.textContent = `Your order from ${restaurantName} has been placed!`;
}

// Initial setup
displayRestaurants();
