const restaurantList = document.getElementById('restaurant-list');
const restaurants = document.getElementById('restaurants');
const menu = document.getElementById('menu');
const restaurantName = document.getElementById('restaurant-name');
const itemsList = document.getElementById('items');
const orderButton = document.getElementById('order-btn');
const orderConfirmation = document.getElementById('order-confirmation');
const orderSummary = document.getElementById('order-summary');

const restaurantsData = [
    { name: 'KFC', logo: 'https://www.shutterstock.com/image-vector/kfc-logo-icon-art-design-260nw-2269871217.jpg', menu: ['Original Recipe Chicken', 'Hot Wings', 'Popcorn Chicken'] },
    { name: 'Burger King', logo: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Burger_King_2020_logo.svg', menu: ['Whopper', 'Chicken Fries', 'Onion Rings'] },
    { name: 'Popeyes', logo: 'https://upload.wikimedia.org/wikipedia/en/b/bf/Popeyes_Louisiana_Kitchen_Logo.svg', menu: ['Chicken Sandwich', 'Cajun Fries', 'Biscuits'] },
    { name: "Domino's", logo: 'https://upload.wikimedia.org/wikipedia/en/4/44/Dominos_logo.svg', menu: ['Pepperoni Pizza', 'Cheese Pizza', 'Chicken Wings'] },
    { name: "McDonald's", logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/McDonald's_logo.svg', menu: ['Big Mac', 'French Fries', 'McChicken'] },
    { name: "Pizza Hut", logo: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Pizza_Hut_logo.svg', menu: ['Pan Pizza', 'Stuffed Crust', 'Breadsticks'] },
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
