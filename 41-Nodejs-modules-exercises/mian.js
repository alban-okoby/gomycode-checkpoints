// Main file to use the local reportGenerator module

// Import the local module
const reportGenerator = require('./reportGenerator');

// Example 1: Single student report
console.log('=== SINGLE STUDENT REPORT ===');
try {
    const studentName = "John Doe";
    const studentScores = [15, 8, 12, 10, 14];
    
    const report = reportGenerator.generateReport(studentName, studentScores);
    console.log(report);
} catch (error) {
    console.error('Error generating report:', error.message);
}

// Example 2: Another student
console.log('\n=== ANOTHER STUDENT REPORT ===');
try {
    const studentName = "Jane Smith";
    const studentScores = [7, 9, 6, 8, 5];
    
    const report = reportGenerator.generateReport(studentName, studentScores);
    console.log(report);
} catch (error) {
    console.error('Error generating report:', error.message);
}

// Example 3: Multiple students (class report)
console.log('\n=== CLASS REPORT ===');
try {
    const classStudents = [
        { name: "Alice Johnson", scores: [18, 16, 19, 17, 20] },
        { name: "Bob Wilson", scores: [12, 10, 14, 9, 11] },
        { name: "Charlie Brown", scores: [8, 7, 6, 9, 5] },
        { name: "Diana Prince", scores: [15, 14, 16, 15, 17] }
    ];
    
    const classReport = reportGenerator.generateClassReport(classStudents);
    console.log(classReport);
} catch (error) {
    console.error('Error generating class report:', error.message);
}

// Example 4: Using individual exported functions
console.log('\n=== USING INDIVIDUAL FUNCTIONS ===');
const scores = [12, 15, 8, 10, 14];
const avg = reportGenerator.calculateAverage(scores);
const status = reportGenerator.getPassFailStatus(avg);

console.log(`Scores: [${scores.join(', ')}]`);
console.log(`Average: ${avg.toFixed(2)}`);
console.log(`Status: ${status}`);