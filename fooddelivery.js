// your code goes here
// Login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'user' && password === 'pass') {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('menu-section').style.display = 'block';
        document.getElementById('order-summary').style.display = 'block';
        document.getElementById('page-title').textContent = `Welcome back, ${username}!`;
    } else {
        alert('Incorrect login credentials.');
    }
});

let order = [];
let total = 0;

// Function to add items to the order
function addToOrder(item, price) {
    order.push({ item, price });
    total += price;
    updateOrderSummary();
}

// Function to update order summary
function updateOrderSummary() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
    order.forEach(orderItem => {
        const li = document.createElement('li');
        li.textContent = `${orderItem.item} - $${orderItem.price}`;
        orderList.appendChild(li);
    });
    document.getElementById('total-price').textContent = `Total: $${total}`;
}

// Checkout button event listener
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (order.length > 0) {
        document.getElementById('menu-section').style.display = 'none';
        document.getElementById('checkout-section').style.display = 'block';
    } else {
        alert('Please add items to your order first.');
    }
});

// Form submission for checkout
document.getElementById('order-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    alert(`Thank you for your order, ${name}!\nAddress: ${address}\nPayment Type: ${payment}\nTotal: $${total}`);

    // Reset order and form
    order = [];
    total = 0;
    updateOrderSummary();
    document.getElementById('checkout-section').style.display = 'none';
    document.getElementById('menu-section').style.display = 'block';
});
