/* Implement an algorithm to delete a node in the middle (i.e., any node but
 * the first and last node, not necessarily the exact middle) of a singly
 * linked list, given only access to that node.
 *
 * EXAMPLE
 * Input: the node c from the linked list a -> b -> c -> d -> e -> f
 * Output: nothing is returned, but the new linked list looks like
 * a -> b -> d -> e -> f
 *
 * My assumptions:
 * - input is properly structured node from properly structured linked list
 * - requires mutation
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function deleteInputNode(node) {
  let curr = node;

  while (curr !== null && curr.next !== null) {
    curr.value = curr.next.value;
    curr.next = curr.next.next;
    curr = curr.next;
  }
}

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
// const d = new Node('d');
// const e = new Node('e');

a.next = b;
b.next = c;
// c.next = d;
// d.next = e;

deleteInputNode(b);
console.log(JSON.stringify(a));