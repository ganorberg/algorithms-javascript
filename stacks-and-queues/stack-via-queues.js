/* Implement a MyStack class which implements a stack using two queues.
 *
 * My assumptions:
 * - no capacity on any structure
 * - methods of interest are push, pop, size, peek
 * - push should return true
 * - pop may be called on empty queue, and undefined will be returned
 */

// Could make linked list to trade instant time complexity for extra pointer space
class Queue {
  constructor() {
    this.q = [];
  }

  // O(N) time unfortunately unless convert to linked list for O(1) time.
  dequeue() {
    return this.q.shift();
  }

  enqueue(value) {
    this.q.push(value);
  }

  isEmpty() {
    return this.q.length === 0;
  }

  size() {
    return this.q.length;
  }
}

function moveAllButLast(q, dump) {
  while (q.size() > 1) {
    dump.enqueue(q.dequeue());
  }
}

function moveBackToQueue(q, dump) {
  while (!dump.isEmpty()) {
    q.enqueue(dump.dequeue());
  }
}

class MyStack {
  constructor() {
    this.q = new Queue();
    this.dump = new Queue();
  }

  peek() {
    // Could also create method on queue to see last in line
    return this.q[this.q.length - 1];
  }

  pop() {
    moveAllButLast(this.q, this.dump);
    const popped = this.q.dequeue();
    moveBackToQueue(this.q, this.dump);
    return popped;
  }

  push(value) {
    this.q.enqueue(value);
    return true;
  }

  size() {
    return this.q.size() + this.dump.size();
  }
}

const stack = new MyStack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
stack.push(6);
stack.pop();
stack.pop();
stack.push(7);
// stack.pop();
// stack.pop();
// stack.pop();
// stack.pop();
// stack.pop();
// stack.pop();
// stack.push(8);
console.log(stack);
