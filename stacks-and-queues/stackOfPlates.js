/* Imagine a (literal) stack of plates. If the stack gets too high, it might
 * topple. Therefore, in real life, we would likely start a new stack when the
 * previous stack exceeds some threshold. Implement a data structure
 * SetOfStacks that mimics this. SetOfStacks should be composed of several
 * stacks and should create a new stack once the previous one exceeds
 * capacity. SetOfStacks.push() and SetOfStacks.pop() should behave identically
 * to a single stack (this is, pop() should return the same values as it would
 * if there were just a single stack).
 *
 * FOLLOW UP
 * Implement a function popAt(index) which performs a pop operation on a
 * specific sub-stack.
 *
 * My assumptions:
 * - we can push or pop any value
 * - push, pop and popAt are only methods of interest
 * - popping an empty stack throws an error
 * - pop returns popped item
 * - push returns true
 * - popAt middle stack does not require push or pop to check if all prior
 *   stacks are full
 */
class SetOfStacks {
  constructor(capacity) {
    this.capacity = capacity;
    this.stacks = [];
  }

  push(value) {
    if (this.stacks.length === 0
      || this.stacks[this.stacks.length - 1].length >= this.capacity) {
      this.stacks.push([]);
    }

    this.stacks[this.stacks.length - 1].push(value);
    return true;
  }

  pop() {
    if (this.stacks.length === 0) {
      throw new Error('Cannot pop an empty stack, my friend!');
    }

    const popped = this.stacks[this.stacks.length - 1].pop();
    if (this.stacks[this.stacks.length - 1].length === 0) { this.stacks.pop(); }
    return popped;
  }

  popAt(index) {
    if (this.stacks.length === 0 || this.stacks[index] === undefined) {
      throw new Error('Cannot pop an empty stack, my friend!');
    }

    const popped = this.stacks[index].pop();
    if (this.stacks[index].length === 0) { this.stacks.splice(index, 1); }
    return popped;
  }
}

const stack = new SetOfStacks(3);
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
stack.push(6);
stack.push(7);
stack.popAt(1);
stack.popAt(1);
// stack.popAt(1);
stack.push(8)
// stack.popAt(2);
// stack.popAt(0);
// stack.popAt(1);
// stack.popAt(1);
// stack.popAt(0);
// stack.popAt(0);
// stack.popAt(0);
// stack.pop();
// stack.pop();
console.log(stack);