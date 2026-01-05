function isPalindrome(str) {
    // Clean string: remove spaces/punctuation and convert to lowercase
    str = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    function helper(s, start, end) {
        if (start >= end) return true; // base case
        if (s[start] !== s[end]) return false;
        return helper(s, start + 1, end - 1);
    }

    return helper(str, 0, str.length - 1);
}

// Example usage:
console.log(isPalindrome("Racecar"));      // true
console.log(isPalindrome("Hello"));        // false
console.log(isPalindrome("A man, a plan, a canal, Panama")); // true
