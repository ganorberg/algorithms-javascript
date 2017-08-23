/* Implement a MyQueue class which implements a queue using two stacks.
 *
 * My assumptions:
 * - no capacity on any structure
 * - methods of interest are enqueue, dequeue, size, peek
 * - enqueue should return true
 * - dequeue may be called on empty queue, and undefined will be returned
 */

class Stack {
  constructor() {
    this.storage = [];
  }

  isEmpty() {
    return this.storage.length === 0;
  }

  peek() {
    return this.storage[this.storage.length - 1];
  }

  push(value) {
    this.storage.push(value);
    return this.storage.length;
  }
  
  pop() {
    return this.storage.pop();
  }

  size() {
    return this.storage.length;
  }
}

const queueStack = new Stack();
const dequeueStack = new Stack();

// private MyQueue method via closure
function dump(stack1, stack2) {
  while (stack1.isEmpty() === false) { stack2.push(stack1.pop()); }
}

class MyQueue {
  constructor() {
    this.q = queueStack;
    this.dq = dequeueStack;
  }

  dequeue() {
    if (this.dq.isEmpty()) { dump(this.q, this.dq); }
    return this.dq.pop();
  }

  enqueue(value) {
    this.q.push(value);
    return true;
  }

  peek() {
    dump(this.q, this.dq);
    return this.dq.peek();
  }

  size() {
    return this.q.size() + this.dq.size();
  }
}

const queue = new MyQueue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
console.log('peek 1:', queue.peek());
console.log('size 4: ', queue.size());
queue.dequeue();
queue.dequeue();
console.log('peek 3:', queue.peek());
console.log('size 2: ', queue.size());
queue.enqueue(5);
queue.enqueue(6);
queue.dequeue();
// queue.dequeue();
// queue.dequeue();
console.log(queue);