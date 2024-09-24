let order = [];
let total = 0;

// Function to add items to order
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

// Event listener for the checkout button
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (order.length > 0) {
        document.querySelector('.order-box').style.display = 'none';
        document.querySelector('.form-box').style.display = 'block';
    } else {
        alert('Please add items to your order first.');
    }
});

// Form submission event listener
document.getElementById('order-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    // Show order confirmation alert
    alert(`Thank you for your order, ${name}!\nAddress: ${address}\nPayment Type: ${payment}\nTotal: $${total}`);

    // Reset order and form
    order = [];
    total = 0;
    updateOrderSummary();
    document.querySelector('.order-box').style.display = 'block';
    document.querySelector('.form-box').style.display = 'none';
    document.getElementById('order-form').reset();
});
