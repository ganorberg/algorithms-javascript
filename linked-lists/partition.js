/* Write code to partition a linked list around a value x, such that all nodes
 * less than x come before all nodes greater than or equal to x. If x is
 * contained within the list, the values of x only need to be after the elements
 * less than x (see below). The partition element x can appear anywhere in the
 * "right partition"; it does not need to appear between the left and right
 * partitions.
 *
 * EXAMPLE
 * Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1 [partition = 5]
 * Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8
 *
 * My assumptions:
 * - in place seems like more fun to implement
 *
 * ALTERNATE SOLUTION:
 * - While traversing list, insert less values into one array and greater than
 *   or equal into another. Then build (or overwrite) to create partitioned list.
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function partition(list, partitionValue) {
  // first pointer stops on >= values
  let first = list;

  // second pointer stops on < values
  let second = list;

  //... but first, need to move both pointers beyond pre-partitioned values 
  while (first !== null && first.value < partitionValue) { first = first.next; }
  while (second !== null && second.value < partitionValue) { second = second.next; }
  second = second.next;

  // use label to break from outer loop when one pointer reaches end of list
  outerLoop:
  while (first !== null && second !== null) {
    while (first.value < partitionValue) {
      first = first.next;
      if (first === null) { break outerLoop; }
    }

    while (second.value >= partitionValue) {
      second = second.next;
      if (second === null) { break outerLoop; }
    }

    // swap values
    const tempValue = first.value;
    first.value = second.value;
    second.value = tempValue;

    // continue traversing
    first = first.next;
    second = second.next;
  }
}

const a = new Node(3);
const b = new Node(5);
const c = new Node(8);
const d = new Node(5);
const e = new Node(10);
const f = new Node(2);
const g = new Node(1);

a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = f;
f.next = g;

partition(a, 5);
console.log(JSON.stringify(a));