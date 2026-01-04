class ArrayQueue {
  constructor(capacity) {
    this.queue = new Array(capacity);
    this.capacity = capacity;
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  enqueue(element) {
    if (this.size === this.capacity) {
      throw new Error("Queue is full");
    }
    this.queue[this.rear] = element;
    this.rear = (this.rear + 1) % this.capacity;
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    const value = this.queue[this.front];
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return value;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.queue[this.front];
  }

  isEmpty() {
    return this.size === 0;
  }
}


console.log("=== Array Queue Tests ===");
const aq = new ArrayQueue(3);

aq.enqueue(10);
aq.enqueue(20);
aq.enqueue(30);

console.log(aq.peek());      // 10
console.log(aq.dequeue());  // 10
console.log(aq.dequeue());  // 20
console.log(aq.isEmpty());  // false

aq.enqueue(40);
console.log(aq.dequeue());  // 30
console.log(aq.dequeue());  // 40
console.log(aq.isEmpty());  // true

// Edge case: dequeue from empty queue
try {
  aq.dequeue();
} catch (e) {
  console.log(e.message); // Queue is empty
}

// Edge case: enqueue into full queue
try {
  aq.enqueue(1);
  aq.enqueue(2);
  aq.enqueue(3);
  aq.enqueue(4);
} catch (e) {
  console.log(e.message); // Queue is full
}
