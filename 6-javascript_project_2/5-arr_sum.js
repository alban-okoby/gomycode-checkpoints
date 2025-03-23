/**
 * Calculates the sum of all element in an Array
 * @param {Array} myArr 
 * @returns 
*/
function sumArray(myArr) {
    return myArr.reduce((a, b) => a + b, 0);
}

console.log(findMin([1, 2, 19, 4, 5])); // 31