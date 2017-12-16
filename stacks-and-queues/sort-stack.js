/* Write a program to sort a stack such that the smallest items are on the top.
 * You can use an additional temporary stack, but you may not copy the elements
 * into any other data structure (such as an array). The stack supports the
 * following operations: push, pop, peek, and isEmpty.
 *
 * My assumptions:
 * - no capacity limit on either stack
 * - stack contains safe non-NaN numbers
 * - input is not empty stack
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

function sortStack(stack) {
  const tempStack = new Stack();

  while (!stack.isEmpty()) {
    const pivot = stack.pop();

    // Move items into sorted order around pivot. Empty tempStack avoids loop.
    while (pivot < tempStack.peek()) {
      stack.push(tempStack.pop());
    }

    // tempStack will always be sorted because pivot is added after all items larger
    tempStack.push(pivot);
  }

  // Populate stack with sorted order now that temp stack has reverse sorted order
  while (!tempStack.isEmpty()) {
    stack.push(tempStack.pop());
  }
}

const stack = new Stack();
stack.push(3);
stack.push(1);
stack.push(2);
stack.push(7);

// for (let i = 0; i < 1000; i++) {
//   stack.push(i);
// }
stack.push(5);
sortStack(stack);
console.log(stack);


// OLD INEFFICIENT SOLUTION
// // move values from stack1 into stack2 using push and pop
// function dump(stack1, stack2) {
//   // compare popped values to previously popped value to see if stack is sorted
//   let previous = Infinity;
//   let sorted = true;

//   while (stack1.isEmpty() === false) {
//     const peek = stack1.peek();
//     if (peek > previous) {
//       sorted = false;
//     }
//     previous = peek;
//     stack2.push(stack1.pop());
//   }

//   return sorted === true ? "sorted" : "not sorted";
// }

// function sortStack(stack) {
//   const tempStack = new Stack();

//   while (true) {
//     // Hold top
//     let value = stack.pop();
//     while (stack.isEmpty() === false) {
//       // If hold > top, move top over
//       if (value > stack.peek()) {
//         tempStack.push(stack.pop());

//         // Move hold and set new hold
//       } else {
//         tempStack.push(value);
//         value = stack.pop();
//       }
//     }

//     tempStack.push(value);

//     // Bad practice to combine command and query...
//     if (dump(tempStack, stack) === "sorted") {
//       return;
//     }
//   }
// }