let cartItems = [];

function calculateItemTotal(item) {
    return item.price * item.quantity;
}

function addItem(name, quantity, price) {
    cartItems.push({ name, quantity, price });
}

function getTotal() {
    return cartItems.reduce((sum, item) => {
        return sum + calculateItemTotal(item);
    }, 0);
}

function viewCart() {
    cartItems.forEach(item => {
        console.log(`${item.name} x${item.quantity}`);
    });
    console.log(`Total: ${getTotal()}`);
}

function removeItem(name) {
    cartItems = cartItems.filter(item => item.name !== name);
}
