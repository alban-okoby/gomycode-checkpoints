let items = [];
let total = 0;

function add(n, q, p, d) {
    let price = p * q;
    if (d === "SUMMER") {
        price = price - price * 0.1;
    }
    items.push({ n, q, p, d });
    total += price;
}

function show() {
    console.log("Cart:");
    for (let i = 0; i < items.length; i++) {
        console.log(items[i].n + " x" + items[i].q);
    }
    console.log("Total: " + total);
}

function remove(name) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].n === name) {
            total -= items[i].p * items[i].q;
            items.splice(i, 1);
        }
    }
}
