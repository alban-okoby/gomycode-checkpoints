// Local module for generating student reports

/**
 * Calculate average of an array of numbers
 * @param {number[]} scores - Array of scores
 * @returns {number} - Average score
 */
const calculateAverage = (scores) => {
    if (!scores || scores.length === 0) return 0;
    const sum = scores.reduce((total, score) => total + score, 0);
    return sum / scores.length;
};

/**
 * Determine pass/fail status based on average score
 * @param {number} average - Average score
 * @returns {string} - 'PASS' or 'FAIL'
 */
const getPassFailStatus = (average) => {
    return average >= 10 ? 'PASS' : 'FAIL';
};

/**
 * Generate a formatted report for a student
 * @param {string} name - Student's name
 * @param {number[]} scores - Array of scores
 * @returns {string} - Formatted report
 */
const generateReport = (name, scores) => {
    // Validate input
    if (!name || typeof name !== 'string') {
        throw new Error('Name must be a valid string');
    }
    
    if (!Array.isArray(scores) || scores.length === 0) {
        throw new Error('Scores must be a non-empty array');
    }

    // Calculate statistics
    const average = calculateAverage(scores);
    const status = getPassFailStatus(average);
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);

    // Format the report
    const report = `
╔════════════════════════════════════╗
║         STUDENT REPORT             ║
╠════════════════════════════════════╣
║ Student Name: ${name.padEnd(23)} ║
╟────────────────────────────────────╢
║ Scores:                            ║
${scores.map((score, index) => `║   Test ${index + 1}: ${score.toString().padEnd(3)}${score >= 10 ? ' ✓' : ' ✗'}`).join('\n')}
╟────────────────────────────────────╢
║ Average Score: ${average.toFixed(2).padEnd(16)} ║
║ Highest Score: ${highestScore.toString().padEnd(16)} ║
║ Lowest Score:  ${lowestScore.toString().padEnd(16)} ║
╟────────────────────────────────────╢
║ Status: ${status.padEnd(27)} ║
╚════════════════════════════════════╝
    `;
    
    return report;
};

/**
 * Generate multiple reports for a class
 * @param {Array} students - Array of student objects with name and scores
 * @returns {string} - Class report
 */
const generateClassReport = (students) => {
    let classReport = '\n📚 CLASS SUMMARY REPORT 📚\n';
    classReport += '='.repeat(40) + '\n\n';
    
    students.forEach((student, index) => {
        classReport += `Student ${index + 1}: ${student.name}\n`;
        classReport += generateReport(student.name, student.scores);
        classReport += '\n';
    });
    
    return classReport;
};

// Export the functions
module.exports = {
    generateReport,
    generateClassReport,
    calculateAverage,
    getPassFailStatus
};