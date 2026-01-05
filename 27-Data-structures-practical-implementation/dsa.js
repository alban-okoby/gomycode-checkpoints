class Queue {
    constructor() {
        this.items = [];
    }

    // Add element to the end
    enqueue(element) {
        this.items.push(element);
    }

    // Remove element from the front
    dequeue() {
        if (this.isEmpty()) {
            console.log("Queue is empty!");
            return null;
        }
        return this.items.shift();
    }

    // Return the front element without removing
    peek() {
        if (this.isEmpty()) return null;
        return this.items[0];
    }

    // Check if the queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Print all elements in the queue
    printQueue() {
        if (this.isEmpty()) {
            console.log("Queue is empty!");
        } else {
            console.log("Queue:", this.items.map(job => `${job.name} (${job.pages} pages)`));
        }
    }
}

class PrinterQueue {
    constructor() {
        this.queue = new Queue();
    }

    // Add a new print job
    addJob(name, pages) {
        const job = { name, pages };
        this.queue.enqueue(job);
        console.log(`Job added: ${name} (${pages} pages)`);
    }

    // Process the next print job
    processJob() {
        if (this.queue.isEmpty()) {
            console.log("No jobs to process.");
            return;
        }
        const job = this.queue.dequeue();
        console.log(`Processing job: ${job.name} (${job.pages} pages)`);
    }

    // Display all jobs in the queue
    printJobs() {
        this.queue.printQueue();
    }
}


const printer = new PrinterQueue();

// Add jobs
printer.addJob("Alice", 5);
printer.addJob("Bob", 10);
printer.addJob("Charlie", 2);

// Print current queue
printer.printJobs();

// Process jobs
printer.processJob();  // Alice
printer.processJob();  // Bob

// Print remaining jobs
printer.printJobs();

// Process remaining jobs
printer.processJob();  // Charlie
printer.processJob();  // No jobs left
