// -----------------------------
// Task Class
// -----------------------------
class Task {
    constructor(name, startTime, endTime, priority) {
        this.name = name;
        this.startTime = startTime; // assume as number or Date
        this.endTime = endTime;
        this.priority = priority; // "High", "Medium", "Low"
    }
}

// -----------------------------
// Task Scheduler Class
// -----------------------------
class TaskScheduler {
    constructor() {
        this.tasks = []; // list of tasks
    }

    // Add a task
    addTask(task) {
        this.tasks.push(task);
    }

    // Sort tasks by start time efficiently (O(n log n))
    sortByStartTime() {
        this.tasks.sort((a, b) => a.startTime - b.startTime);
    }

    // Group tasks by priority using a hash map (O(n))
    groupByPriority() {
        const groups = {};
        for (const task of this.tasks) {
            if (!groups[task.priority]) {
                groups[task.priority] = [];
            }
            groups[task.priority].push(task);
        }
        return groups;
    }

    // Detect overlapping tasks (interval scheduling pattern)
    detectOverlaps() {
        // First sort tasks by start time (O(n log n))
        this.sortByStartTime();

        const overlaps = [];
        for (let i = 0; i < this.tasks.length - 1; i++) {
            const current = this.tasks[i];
            const next = this.tasks[i + 1];

            // Overlap exists if next.startTime < current.endTime
            if (next.startTime < current.endTime) {
                overlaps.push([current, next]);
            }
        }
        return overlaps;
    }

    // Display tasks
    displayTasks() {
        for (const task of this.tasks) {
            console.log(`${task.name} | ${task.startTime}-${task.endTime} | ${task.priority}`);
        }
    }

    // Optional: Estimate memory usage (rough approximation)
    estimateMemoryUsage() {
        const taskCount = this.tasks.length;
        // assume ~100 bytes per task (rough estimate)
        const bytesPerTask = 100;
        return taskCount * bytesPerTask;
    }
}

// Example usage
const scheduler = new TaskScheduler();

// Add tasks
scheduler.addTask(new Task("Task 1", 9, 11, "High"));
scheduler.addTask(new Task("Task 2", 10, 12, "Medium"));
scheduler.addTask(new Task("Task 3", 13, 14, "Low"));
scheduler.addTask(new Task("Task 4", 11, 13, "High"));

// Display all tasks
console.log("All Tasks:");
scheduler.displayTasks();

// Sort tasks by start time
scheduler.sortByStartTime();
console.log("\nTasks Sorted by Start Time:");
scheduler.displayTasks();

// Group by priority
const grouped = scheduler.groupByPriority();
console.log("\nTasks Grouped by Priority:");
console.log(grouped);

// Detect overlapping tasks
const overlaps = scheduler.detectOverlaps();
console.log("\nOverlapping Tasks:");
for (const [t1, t2] of overlaps) {
    console.log(`${t1.name} overlaps with ${t2.name}`);
}

// Estimate memory usage
console.log("\nEstimated memory usage (bytes):", scheduler.estimateMemoryUsage());