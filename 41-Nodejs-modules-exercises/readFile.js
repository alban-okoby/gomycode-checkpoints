// readFile.js
// Task 1: Using built-in fs module to read a file

// Load the built-in fs module
const fs = require('fs');

// Define the file path
const filePath = './message.txt';

try {
    // Read the file synchronously
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Print the file content to the console
    console.log('=== File Content ===');
    console.log(fileContent);
    console.log('===================');
    
    // Also get file information
    const fileStats = fs.statSync(filePath);
    console.log('\n=== File Information ===');
    console.log(`File size: ${fileStats.size} bytes`);
    console.log(`Created: ${fileStats.birthtime}`);
    console.log(`Last modified: ${fileStats.mtime}`);
    
} catch (error) {
    console.error('Error reading file:', error.message);
}

// Alternative: Using asynchronous method
console.log('\n=== Reading asynchronously ===');
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Async error:', err.message);
        return;
    }
    console.log('Async read successful!');
    console.log('First line:', data.split('\n')[0]);
});