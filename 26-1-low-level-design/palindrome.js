function isPalindrome(word) {
  // Stop condition
  if (word.length <= 1) {
    return true;
  }

  // If first and last characters differ, stop
  if (word[0] !== word[word.length - 1]) {
    return false;
  }

  // Test the rest of the word
  return isPalindrome(word.slice(1, -1));
}


console.log(isPalindrome("gag"));     // true
console.log(isPalindrome("kayak"));  // true
console.log(isPalindrome("php"));    // true
console.log(isPalindrome("radar"));  // true
console.log(isPalindrome("hello"));  // false
console.log(isPalindrome("a"));      // true
console.log(isPalindrome(""));