/*
 * In the classic problem of the Towers of Hanoi, you have 3 towers and N disks 
 * of different sizes which can slide onto any tower. The puzzle starts with 
 * disks sorted in ascending order of size from top to bottom (i.e., each disk 
 * sits on top of an even larger one). You have the following constraints:
 * 
 * 1. Only one disk can be moved at a time.
 * 2. A disk is slid off the top of one tower onto another tower.
 * 3. A disk cannot be placed on top of a smaller disk.
 * 
 * Write a program to move the disks from the first tower to the last using 
 * stacks.
 * 
 * ASSUMPTIONS:
 * - valid inputs
 * - less operations preferred
 * - first input is stack with all N disks, second and third inputs are empty stacks
 * - stacks have push, pop, peek, and isEmpty operations
 * - disks are represented as positive integer values
 * 
 * STRATEGY: O(2^N) time complexity
 * - trust the recursion
 * - notice pattern for movePair, moveTriple, moveQuad, etc. then use top-down
 *   recursion to implement
 * - essentially any tower of any length can be moved temporarily to a buffer
 *   tower, freeing up a bottom piece to move to its destination.
 */
class Stack {
  constructor(N = 0) {
    this.stack = [];

    for (let i = N; i >= 1; i--) {
      this.stack.push(i);
    }
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  pop() {
    this.stack.pop();
  }

  push(value) {
    this.stack.push(value);
  }
}

function towersOfHanoi(N) {
  const source = new Stack(N);
  const other = new Stack();
  const destination = new Stack();

  moveDisksFromFirstTowerToLast(N, source, other, destination);
  return [source, other, destination]; // to visualize outcome
}

// Extremely elegant top-down "trust the recursion" code.
function moveDisksFromFirstTowerToLast(N, source, other, destination) {
  // This means parent call has N=1, which means stop recursing and move final
  // disk between parent's recursive calls.
  if (N === 0) { return; }

  // Notice other stack is used as a buffer to free bottom disk
  moveDisksFromFirstTowerToLast(N - 1, source, destination, other);

  // Move bottom disk
  moveDisk(source, destination);

  // Now plop other stack onto bottom disk. At highest call, final tower is sorted.
  moveDisksFromFirstTowerToLast(N - 1, other, source, destination);
}

function moveDisk(source, destination) {
  const value = source.peek();
  source.pop();
  destination.push(value);
}

// TO SEE PATTERN
// function movePair(source, other, destination) {
//   moveDisk(source, other);
//   moveDisk(source, destination);
//   moveDisk(other, destination);
// }

// function moveTriple(source, other, destination) {
//   movePair(source, destination, other);
//   moveDisk(source, destination);
//   movePair(other, source, destination);
// }

// function moveQuad(source, other, destination) {
//   moveTriple(source, destination, other);
//   // movePair, moveDisk, movePair
//   moveDisk(source, destination);
//   moveTriple(other, source, destination);
//   // movePair, moveDisk, movePair
// }

console.log(towersOfHanoi(1));
console.log(towersOfHanoi(2));
console.log(towersOfHanoi(3));
console.log(towersOfHanoi(4));
console.log(towersOfHanoi(10));
console.log(towersOfHanoi(25)); // 25+ is where algorithm gets really slow