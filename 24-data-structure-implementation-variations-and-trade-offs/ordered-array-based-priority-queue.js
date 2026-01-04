class OrderedArrayPriorityQueue {
  constructor() {
    this.items = [];
  }

  insert(element) {
    let i = 0;
    while (i < this.items.length && this.items[i].priority <= element.priority) {
      i++;
    }
    this.items.splice(i, 0, element);
  }

  extractMin() {
    if (this.isEmpty()) {
      throw new Error("Priority Queue is empty");
    }
    return this.items.shift();
  }

  peekMin() {
    if (this.isEmpty()) {
      throw new Error("Priority Queue is empty");
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

console.log("\n=== Ordered Array Priority Queue Tests ===");
const orderedPQ = new OrderedArrayPriorityQueue();

orderedPQ.insert({ value: "Job X", priority: 4 });
orderedPQ.insert({ value: "Job Y", priority: 1 });
orderedPQ.insert({ value: "Job Z", priority: 3 });

console.log(orderedPQ.peekMin());    // Job Y
console.log(orderedPQ.extractMin()); // Job Y
console.log(orderedPQ.extractMin()); // Job Z
console.log(orderedPQ.extractMin()); // Job X
console.log(orderedPQ.isEmpty());    // true

// Edge case: peek from empty PQ
try {
  orderedPQ.peekMin();
} catch (e) {
  console.log(e.message); // Priority Queue is empty
}
