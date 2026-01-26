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

#### Tests case
```js
console.log(isPalindrome("gag"));     // true
console.log(isPalindrome("kayak"));  // true
console.log(isPalindrome("php"));    // true
console.log(isPalindrome("radar"));  // true
console.log(isPalindrome("hello"));  // false
console.log(isPalindrome("a"));      // true
console.log(isPalindrome(""));
````

