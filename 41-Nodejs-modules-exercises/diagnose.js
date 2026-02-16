// diagnose.js
// Run this to check your setup

const fs = require('fs');
const path = require('path');

console.log("=== DIAGNOSTIC INFORMATION ===\n");

// Check current directory
console.log("Current directory:", process.cwd());
console.log();

// List all files in current directory
console.log("Files in current directory:");
const files = fs.readdirSync('.');
files.forEach(file => {
    const stats = fs.statSync(file);
    const type = stats.isDirectory() ? "DIR" : "FILE";
    console.log(`  [${type}] ${file}`);
});
console.log();

// Check if reportGenerator.js exists
try {
    require.resolve('./reportGenerator.js');
    console.log("✅ reportGenerator.js found");
} catch (e) {
    console.log("❌ reportGenerator.js NOT found");
    console.log("   Error:", e.message);
}
console.log();

// Check if main.js exists
try {
    require.resolve('./main.js');
    console.log("✅ main.js found");
} catch (e) {
    console.log("❌ main.js NOT found");
    console.log("   Error:", e.message);
}

console.log("\n=== DIAGNOSTIC COMPLETE ===");