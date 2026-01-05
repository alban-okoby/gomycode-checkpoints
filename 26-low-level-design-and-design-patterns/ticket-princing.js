function ticketPrice(age) {
    if (age <= 12) {
        return 10;
    } else if (age >= 13 && age <= 17) {
        return 15;
    } else {
        return 20;
    }
}

// Example usage:
console.log(ticketPrice(10)); // 10
console.log(ticketPrice(15)); // 15
console.log(ticketPrice(25)); // 20
