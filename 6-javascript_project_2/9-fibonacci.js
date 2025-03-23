/**
 * Generates the Fibonacci sequence up to a given number of term
 * @param {n} number of terms
 * @returns generated sequence
 */
function fibonacci(n) {
    let fib = [0, 1];
    for (let i = 2; i < n; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
    return (fib);
}