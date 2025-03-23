// 
/*
 * Capitalizes the first letter of each word in a sentence
 *
 * @param {string} str - The input string to capitalize.
 * @returns {string} The capitalized version.
 *
 */
function capitalizeWords(str) {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

console.log(countString("hello")); // HELLO