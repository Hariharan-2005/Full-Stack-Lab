let order = [];
let total = 0;

function addToOrder(item, price) {
    order.push({ item, price });
    total += price;
    updateOrderSummary();
}

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

document.getElementById('checkout-btn').addEventListener('click', () => {
    if (order.length > 0) {
        document.getElementById('order-summary').style.display = 'none';
        document.getElementById('order-details').style.display = 'block';
    } else {
        alert('Please add items to your order first.');
    }
});

document.getElementById('order-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const payment = document.getElementById('payment').value;

    alert(`Thank you for your order, ${name}!\nLocation: ${location}\nPayment Type: ${payment}\nTotal: $${total}`);

    // Reset order
    order = [];
    total = 0;
    updateOrderSummary();
    document.getElementById('order-summary').style.display = 'block';
    document.getElementById('order-details').style.display = 'none';
    document.getElementById('order-form').reset(); // Reset the form
});
