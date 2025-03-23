/** 
 * Reverse a string
 * @param {string} str - The input string to reverse
 * @returns {string} The reversed version of the input string
 */
function reverseString(str) {
    return str.split("").reverse().join("");
}

console.log(reverseString("hello")); // "olleh"