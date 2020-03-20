const incrementIndex = (index, capacity) => {
  return index + 1 === capacity ? 0 : index + 1;
};

class CircularQueue {
  constructor(capacity = 3) {
    this.capacity = capacity;
    this.q = [];
    this.newestIndex = -1;
    this.oldestIndex = -1;
  }

  // Could be O(1) time with LL + Hashmap
  dequeue() {
    if (this.size() === 0) {
      return;
    }

    this.q.splice(this.oldestIndex, 1);
    if (this.oldestIndex === 0) {
      this.newestIndex--;
    }

    if (this.oldestIndex + 1 === this.capacity) {
      this.oldestIndex = 0;
    }
  }

  // Can reduce these cases, but this is easy to read
  enqueue(value) {
    if (this.size() === 0) {
      this.q.push(value);
      this.newestIndex = 0;
      this.oldestIndex = 0;
      return;
    }

    if (this.size() < this.capacity) {
      this.q.push(value);
      this.newestIndex++;
      return;
    }

    this.q[this.oldestIndex] = value;
    this.oldestIndex = incrementIndex(this.oldestIndex, this.capacity);
    this.newestIndex = incrementIndex(this.newestIndex, this.capacity);
  }

  peekOldest() {
    return this.q[this.oldestIndex];
  }

  peekNewest() {
    return this.q[this.newestIndex];
  }

  size() {
    return this.q.length;
  }
}

// Enqueuing:
// [0]
// [0, 1]
// [0, 1, 2]
// [3, 1, 2]
// [3, 4, 2]

// Dequeuing:
// [3, 4]
// [4]
// []

const circleQ = new CircularQueue();
circleQ.enqueue(1);
console.log("q: ", circleQ.q);
console.log("newest: ", circleQ.peekNewest());
console.log("oldest: ", circleQ.peekOldest());
circleQ.enqueue(2);
console.log("q: ", circleQ.q);
console.log("newest: ", circleQ.peekNewest());
console.log("oldest: ", circleQ.peekOldest());
circleQ.enqueue(3);
console.log("q: ", circleQ.q);
console.log("newest: ", circleQ.peekNewest());
console.log("oldest: ", circleQ.peekOldest());
circleQ.enqueue(4);
console.log("q: ", circleQ.q);
console.log("newest: ", circleQ.peekNewest());
console.log("oldest: ", circleQ.peekOldest());
circleQ.enqueue(5);
console.log("q: ", circleQ.q);
console.log("newest: ", circleQ.peekNewest());
console.log("oldest: ", circleQ.peekOldest());
circleQ.dequeue();
console.log("q: ", circleQ.q);
circleQ.dequeue();
console.log("q: ", circleQ.q);
circleQ.dequeue();
console.log("q: ", circleQ.q);
circleQ.enqueue(1);
console.log("q: ", circleQ.q);
console.log("newest: ", circleQ.peekNewest());
console.log("oldest: ", circleQ.peekOldest());
circleQ.enqueue(2);
console.log("q: ", circleQ.q);
console.log("newest: ", circleQ.peekNewest());
console.log("oldest: ", circleQ.peekOldest());
circleQ.enqueue(3);
console.log("q: ", circleQ.q);
console.log("newest: ", circleQ.peekNewest());
console.log("oldest: ", circleQ.peekOldest());
circleQ.dequeue();
console.log("q: ", circleQ.q);
