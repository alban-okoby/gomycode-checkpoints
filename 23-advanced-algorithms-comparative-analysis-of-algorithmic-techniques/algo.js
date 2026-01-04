// -----------------------------
// Sample input
// -----------------------------
const tasks = [
  { start: 1, end: 3 },
  { start: 2, end: 5 },
  { start: 4, end: 6 },
  { start: 6, end: 7 },
  { start: 5, end: 9 },
  { start: 8, end: 10 }
];

// -----------------------------
// Brute-Force Solution
// Explore all subsets recursively
// -----------------------------
function bruteForceMaxTasks(tasks) {
  const n = tasks.length;
  let maxCount = 0;

  function backtrack(index, lastEnd, count) {
    if (index === n) {
      maxCount = Math.max(maxCount, count);
      return;
    }

    // Option 1: Skip current task
    backtrack(index + 1, lastEnd, count);

    // Option 2: Take current task if it doesn't overlap
    if (tasks[index].start >= lastEnd) {
      backtrack(index + 1, tasks[index].end, count + 1);
    }
  }

  backtrack(0, 0, 0);
  return maxCount;
}

// -----------------------------
// Greedy Solution
// Sort by end time and pick earliest finishing tasks
// -----------------------------
function greedyMaxTasks(tasks) {
  // Sort tasks by end time
  const sortedTasks = tasks.slice().sort((a, b) => a.end - b.end);

  let count = 0;
  let lastEnd = 0;

  for (const task of sortedTasks) {
    if (task.start >= lastEnd) {
      count++;
      lastEnd = task.end;
    }
  }

  return count;
}

// -----------------------------
// Test correctness
// -----------------------------
console.log("Brute Force Result:", bruteForceMaxTasks(tasks)); // 4
console.log("Greedy Result:", greedyMaxTasks(tasks));         // 4

// -----------------------------
// Performance Test for Large Input (~10,000 tasks)
// -----------------------------
function generateRandomTasks(numTasks, maxTime = 10000) {
  const arr = [];
  for (let i = 0; i < numTasks; i++) {
    const start = Math.floor(Math.random() * maxTime);
    const end = start + Math.floor(Math.random() * 100) + 1; // random duration
    arr.push({ start, end });
  }
  return arr;
}

const largeTasks = generateRandomTasks(10000);

// Time Greedy
console.time("Greedy Time");
console.log("Greedy Result (Large Input):", greedyMaxTasks(largeTasks));
console.timeEnd("Greedy Time");

// Note: Brute-force on 10,000 tasks is impractical and will crash
// console.time("Brute Force Time");
// console.log("Brute Force Result (Large Input):", bruteForceMaxTasks(largeTasks));
// console.timeEnd("Brute Force Time");
