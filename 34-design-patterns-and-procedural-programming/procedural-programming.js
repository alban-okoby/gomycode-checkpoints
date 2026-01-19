let cart = [];

// Add item to the cart
function addItem(name, quantity, price) {
    cart.push({
        name: name,
        quantity: quantity,
        price: price
    });
}

// View all items in the cart
function viewCart() {
    let total = 0;

    if (cart.length === 0) {
        console.log("Cart is empty.");
        return;
    }

    cart.forEach(item => {
        let itemTotal = item.quantity * item.price;
        total += itemTotal;
        console.log(`${item.name} (x${item.quantity}) - ${itemTotal.toFixed(2)} TND`);
    });

    console.log(`Total: ${total.toFixed(2)} TND`);
}

// Remove an item by name
function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
}

// Clear all items from the cart
function clearCart() {
    cart = [];
}

// Example usage
addItem("Apple", 2, 1.5);
addItem("Orange", 3, 2.0);
viewCart();

removeItem("Apple");
viewCart();
