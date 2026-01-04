class MinHeapPriorityQueue {
  constructor() {
    this.heap = [];
  }

  insert(element) {
    this.heap.push(element);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent].priority <= this.heap[index].priority) break;
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  extractMin() {
    if (this.isEmpty()) {
      throw new Error("Priority Queue is empty");
    }
    const min = this.heap[0];
    const last = this.heap.pop();
    if (!this.isEmpty()) {
      this.heap[0] = last;
      this.bubbleDown();
    }
    return min;
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (left < length && this.heap[left].priority < this.heap[smallest].priority) {
        smallest = left;
      }
      if (right < length && this.heap[right].priority < this.heap[smallest].priority) {
        smallest = right;
      }
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }

  peekMin() {
    if (this.isEmpty()) {
      throw new Error("Priority Queue is empty");
    }
    return this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

console.log("\n=== Min Heap Priority Queue Tests ===");
const minPQ = new MinHeapPriorityQueue();

minPQ.insert({ value: "Task A", priority: 3 });
minPQ.insert({ value: "Task B", priority: 1 });
minPQ.insert({ value: "Task C", priority: 2 });

console.log(minPQ.peekMin());    // Task B
console.log(minPQ.extractMin()); // Task B
console.log(minPQ.extractMin()); // Task C
console.log(minPQ.extractMin()); // Task A
console.log(minPQ.isEmpty());    // true

// Edge case: extract from empty PQ
try {
  minPQ.extractMin();
} catch (e) {
  console.log(e.message); // Priority Queue is empty
}
