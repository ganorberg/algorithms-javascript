/* Write a program to sort a stack such that the smallest items are on the top.
 * You can use an additional temporary stack, but you may not copy the elements
 * into any other data structure (such as an array). The stack supports the
 * following operations: push, pop, peek, and isEmpty.
 *
 * My assumptions:
 * - no capacity limit on either stack
 * - stack contains safe non-NaN numbers
 * - input is not empty stack
 *
 * ALTERNATIVE SOLUTION:
 * - dump check not necessary. Can use tempStack as sorted stack and move
 *   value from stack into proper position on tempStack with similar logic.
 *   When stack is empty, tempStack dumps into stack to deliver sorted stack.
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
}

// move values from stack1 into stack2 using push and pop
function dump(stack1, stack2) {
  // compare popped values to previously popped value to see if stack is sorted
  let previous = Infinity;
  let sorted = true;

  while (stack1.isEmpty() === false) {
    const peek = stack1.peek();
    if (peek > previous) { sorted = false; }
    previous = peek;
    stack2.push(stack1.pop());
  }

  return sorted === true ? 'sorted' : 'not sorted';
}

function sortStack(stack) {
  const tempStack = new Stack();

  while (true) {
    let value = stack.pop();
    while (stack.isEmpty() === false) {
      if (value > stack.peek()) { tempStack.push(stack.pop()); }
      else {
        tempStack.push(value);
        value = stack.pop();
      }
    }
  
    tempStack.push(value);
    if (dump(tempStack, stack) === 'sorted') { return; }
  }
}

const stack = new Stack();
// stack.push(3);
// stack.push(1);
// stack.push(2);
// stack.push(5);

for (let i = 0; i < 1000; i++) {
  stack.push(i);
}
// stack.push(7);
sortStack(stack);
console.log(stack);
