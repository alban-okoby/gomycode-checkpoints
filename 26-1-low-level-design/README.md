# Low-Level Design and Design
### Logic (as requested)
- Compare the first and last characters
- If they are different → stop → not a palindrome
- If they are the same → test the remaining word
- Stop condition:
-- Empty string
-- Single character
→ both are palindromes
#### How to test ? 
```
node paindrome.js
```  
# Palindrome Checker

## Description

Test if a word is a palindrome. A palindrome is a word that can be read the same from left to right or from right to left.

### Examples of Palindromes
- **gag** → reads same forwards and backwards
- **kayak** → symmetric spelling
- **php** → programming language palindrome
- **radar** → common palindrome example
- **racecar** → another classic example
- **level** → floor palindrome

### Non-Palindrome Examples
- **hello** → "hello" vs "olleh" (different)
- **world** → not symmetric
- **javascript** → too complex

## Algorithm Explanation

The algorithm compares characters from both ends moving inward:


### Recursive Breakdown

1. **Base cases:**
   - Empty string (`""`) → palindrome ✓
   - Single character (`"a"`) → palindrome ✓

2. **Recursive case:**
   - Compare first and last characters
   - If equal → test the remaining substring (excluding ends)
   - If different → not a palindrome ✗

## Implementation

```javascript
/**
 * Check if a word is a palindrome using recursion
 * @param {string} word - The word to test
 * @returns {boolean} - True if palindrome, false otherwise
 */
function isPalindrome(word) {
    // Convert to string and lowercase for case-insensitive comparison
    const str = String(word).toLowerCase();
    
    // Base case: empty string or single character is a palindrome
    if (str.length <= 1) {
        return true;
    }
    
    // Compare first and last characters
    if (str[0] !== str[str.length - 1]) {
        return false; // Difference found, not a palindrome
    }
    
    // Recursive case: test the substring without first and last chars
    return isPalindrome(str.slice(1, -1));
}

/**
 * Iterative version (alternative approach)
 * @param {string} word - The word to test
 * @returns {boolean} - True if palindrome, false otherwise
 */
function isPalindromeIterative(word) {
    const str = String(word).toLowerCase();
    let left = 0;
    let right = str.length - 1;
    
    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

/**
 * Two-pointer approach with character validation
 * Handles spaces, punctuation, and mixed case
 * @param {string} word - The word or phrase to test
 * @returns {boolean} - True if palindrome, false otherwise
 */
function isPalindromeAdvanced(word) {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleaned = String(word)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
    
    // Use two-pointer technique
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

// ============================================
// TEST CASES
// ============================================

console.log("=" .repeat(50));
console.log("PALINDROME CHECKER - TEST RESULTS");
console.log("=" .repeat(50));

// Basic palindrome tests
const testCases = [
    { word: "radar", expected: true },
    { word: "kayak", expected: true },
    { word: "level", expected: true },
    { word: "php", expected: true },
    { word: "gag", expected: true },
    { word: "hello", expected: false },
    { word: "world", expected: false },
    { word: "javascript", expected: false },
    { word: "", expected: true },
    { word: "a", expected: true },
    { word: "aa", expected: true },
    { word: "ab", expected: false }
];

console.log("\n--- Basic Tests ---");
testCases.forEach(test => {
    const result = isPalindrome(test.word);
    const status = result === test.expected ? "✓" : "✗";
    console.log(`${status} "${test.word}" → ${result} (Expected: ${test.expected})`);
});

// Case-sensitive test
console.log("\n--- Case Insensitive Test ---");
const caseTests = [
    { word: "Racecar", expected: true },
    { word: "RaDaR", expected: true },
    { word: "Kayak", expected: true }
];

caseTests.forEach(test => {
    const result = isPalindrome(test.word);
    const status = result === test.expected ? "✓" : "✗";
    console.log(`${status} "${test.word}" → ${result}`);
});

// Advanced palindrome tests (phrases with spaces/punctuation)
console.log("\n--- Advanced Tests (Phrases) ---");
const phraseTests = [
    { phrase: "A man, a plan, a canal: panama", expected: true },
    { phrase: "race a car", expected: false },
    { phrase: "Was it a car or a cat I saw?", expected: true },
    { phrase: "No 'x' in Nixon", expected: true },
    { phrase: "Madam, I'm Adam", expected: true }
];

phraseTests.forEach(test => {
    const result = isPalindromeAdvanced(test.phrase);
    const status = result === test.expected ? "✓" : "✗";
    console.log(`${status} "${test.phrase}" → ${result}`);
});

// Performance comparison
console.log("\n--- Performance Comparison ---");

function performanceTest() {
    const longPalindrome = "a".repeat(10000) + "b" + "a".repeat(10000);
    
    console.time("Recursive Method");
    const recursiveResult = isPalindrome(longPalindrome);
    console.timeEnd("Recursive Method");
    
    console.time("Iterative Method");
    const iterativeResult = isPalindromeIterative(longPalindrome);
    console.timeEnd("Iterative Method");
    
    console.log(`Results match: ${recursiveResult === iterativeResult}`);
}

performanceTest();

// Interactive CLI function
function interactivePalindromeChecker() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    console.log("\n" + "=" .repeat(50));
    console.log("INTERACTIVE PALINDROME CHECKER");
    console.log("=" .repeat(50));
    console.log("Enter a word or phrase to check if it's a palindrome.");
    console.log("Type 'exit' to quit.\n");
    
    function askQuestion() {
        rl.question("Enter text: ", (input) => {
            if (input.toLowerCase() === 'exit') {
                console.log("Goodbye!");
                rl.close();
                return;
            }
            
            if (input.trim() === "") {
                console.log("Empty string is considered a palindrome.\n");
            } else {
                const isPal = isPalindromeAdvanced(input);
                console.log(`"${input}" is ${isPal ? "✓ a palindrome" : "✗ NOT a palindrome"}\n`);
            }
            
            askQuestion();
        });
    }
    
    askQuestion();
}

// Uncomment to run interactive mode
// interactivePalindromeChecker();

// Export functions for module use
module.exports = {
    isPalindrome,
    isPalindromeIterative,
    isPalindromeAdvanced
};
```

### Algorithm Visualisation
```
Example: "radar"
Step 1: Compare 'r' (first) with 'r' (last) → equal ✓
Step 2: Compare 'a' (second) with 'a' (second-last) → equal ✓
Step 3: Compare 'd' (middle) → single character → palindrome ✓

Example: "hello"
Step 1: Compare 'h' with 'o' → different ✗
Result: NOT a palindrome
```
