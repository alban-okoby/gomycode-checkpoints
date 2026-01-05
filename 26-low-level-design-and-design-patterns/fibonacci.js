function fibonacci(n) {
    if (n === 0) return 0;   // base case
    if (n === 1) return 1;   // base case
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example usage:
console.log(fibonacci(0)); // 0
console.log(fibonacci(1)); // 1
console.log(fibonacci(7)); // 13
