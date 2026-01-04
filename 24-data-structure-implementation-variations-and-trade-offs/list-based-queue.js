class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListQueue {
  constructor() {
    this.front = null;
    this.rear = null;
  }

  enqueue(element) {
    const newNode = new Node(element);
    if (this.isEmpty()) {
      this.front = this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    const value = this.front.value;
    this.front = this.front.next;
    if (!this.front) this.rear = null;
    return value;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.front.value;
  }

  isEmpty() {
    return this.front === null;
  }
}

console.log("\n=== Linked List Queue Tests ===");
const llq = new LinkedListQueue();

llq.enqueue("A");
llq.enqueue("B");
llq.enqueue("C");

console.log(llq.peek());     // A
console.log(llq.dequeue()); // A
console.log(llq.dequeue()); // B
console.log(llq.isEmpty()); // false

console.log(llq.dequeue()); // C
console.log(llq.isEmpty()); // true

// Edge case: dequeue from empty queue
try {
  llq.dequeue();
} catch (e) {
  console.log(e.message); // Queue is empty
}
