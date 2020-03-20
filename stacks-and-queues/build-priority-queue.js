/**
 * Interface:
 * - peek minimum in constant time
 * - remove min in O(logn)
 * - add item in O(logn)
 *
 * Thoughts:
 * - must maintain complete binary tree
 * - use array as heap where array[0] is null to make math easier
 * - use math to traverse tree and compare children to parent
 * - use sink and swim functions to bring values up and down tree
 *   to maintain invariants
 */
const isEven = n => n % 2 === 0;
function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}

// value starts as last in heap
// compare to its parent. if greater, swap.
// where is its parent? well, mathematically, children are at indexes
// 2n and 2n + 1, where n is the parent's index. so for root, its children
// are at indexes 2 and 3. for index 2, its children will be at 4 and 5, etc.
// To calculate parent, we solve equation for n. So n = child/2 for evens and
// n = (child - 1)/2 for odds.
// repeat until parent is smaller or child is at root
function swim(heap, childIndex = heap.length - 1) {
  if (childIndex === 1) {
    return;
  }

  const childValue = heap[childIndex];
  const parentIndex = isEven(childIndex)
    ? childIndex / 2
    : (childIndex - 1) / 2;
  const parentValue = heap[parentIndex];
  if (parentValue <= childValue) {
    return;
  }

  swap(heap, childIndex, parentIndex);
  swim(heap, parentIndex);
}

// calculate children indexes
// if no children exist, return error message
// if one child exists, return other child
// if both exist, compare and return index of smaller
function getSmallerChildIndex(heap, parentIndex) {
  const firstChildIndex = 2 * parentIndex;
  const secondChildIndex = 2 * parentIndex + 1;
  const firstChildValue = heap[firstChildIndex];
  const secondChildValue = heap[secondChildIndex];
  if (firstChildValue === undefined && secondChildValue === undefined) {
    return "no children";
  }

  if (firstChildValue === undefined) {
    return secondChildIndex;
  }

  if (secondChildValue === undefined) {
    return firstChildIndex;
  }

  // tie doesn't matter, so default to second child to keep more readable < sign
  return firstChildValue < secondChildValue
    ? firstChildIndex
    : secondChildIndex;
}

// get smaller child index
// swap with smaller child
// repeat with same value, heap, and smaller child's index
function sink(heap, parentIndex = 1) {
  // Stop if heap only has root (and null)
  if (heap.length === 2) {
    return;
  }

  const parentValue = heap[parentIndex];
  const smallerChildIndex = getSmallerChildIndex(heap, parentIndex);
  if (smallerChildIndex === "no children") {
    return;
  }

  const smallerChildValue = heap[smallerChildIndex];
  if (parentValue <= smallerChildValue) {
    return;
  }

  swap(heap, parentIndex, smallerChildIndex);
  sink(heap, smallerChildIndex);
}

class MinPriorityQueue {
  constructor() {
    this.heap = [null];
  }

  add(value) {
    this.heap.push(value);
    swim(this.heap);
  }

  peek() {
    return this.heap[1];
  }

  remove() {
    if (this.heap.length <= 1) {
      return;
    }

    swap(this.heap, 1, this.heap.length - 1);
    this.heap.pop();
    sink(this.heap);
  }
}

// [null, root, childA, childB, childAA, child AB, childBA, childBB]
const q = new MinPriorityQueue();
q.add(15);
console.log(q.heap);
q.add(10);
console.log(q.heap);
q.add(14);
console.log(q.heap);
q.add(13);
console.log(q.heap);
q.add(10);
console.log(q.heap);
q.add(1);
console.log(q.heap);
console.log(q.peek());
q.remove();
console.log(q.heap);
q.remove();
console.log(q.heap);
q.remove();
console.log(q.heap);
q.remove();
console.log(q.heap);
q.remove();
console.log(q.heap);
q.remove();
console.log(q.heap);
q.remove();
console.log(q.heap);
q.add(1);
console.log(q.heap);
q.add(-1);
console.log(q.heap);
