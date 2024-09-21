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
        alert('Thank you for your order!');
        order = [];
        total = 0;
        updateOrderSummary();
    } else {
        alert('Please add items to your order first.');
    }
});

