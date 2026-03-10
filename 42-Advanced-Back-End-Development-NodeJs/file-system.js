const fs = require("fs");

// Create a file named welcome.txt
fs.writeFileSync("welcome.txt", "Hello Node");

// Read the file
const data = fs.readFileSync("welcome.txt", "utf8");
console.log(data);