/**
 * calculates the factorial of a given number
 * @param {number} num 
 * @returns 
 */
function factorial(num) {
    if (num === 0 || num === 1) return 1;
    return num * factorial(num - 1)
}