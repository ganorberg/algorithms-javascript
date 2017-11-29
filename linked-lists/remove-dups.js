/* Write code to remove duplicates from an unsorted linked list.
 *
 * FOLLOW UP
 * How would you solve this problem if a temporary buffer is not allowed?
 *
 * My assumptions:
 * - input is properly structured linked list
 * - if multiple duplicates, remove them all
 *
 * FOLLOW UP IMPLEMENTATION:
 * - pause at each value in list, then traverse down list with nested loop
 *   to remove duplicates. Requires two pointers while traversing.
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function removeDups(list) {
  // set begins with head's value already stored
  const values = new Set(list.value);

  // maintain pointer at head to return
  const head = list;
  let curr = head;

  while (curr !== null && curr.next !== null) {
    if (values.has(curr.next.value)) {
      // notice we maintain curr for next pass to check for sequence of dupes
      curr.next = curr.next.next;
    } else {
      values.add(curr.next.value);
      curr = curr.next;
    }
  }

  return head;
}



const a = new Node('b');
const b = new Node('b');
const c = new Node('b');
const dupe = new Node('b');
const d = new Node('b');

a.next = b;
b.next = c;
c.next = dupe;
dupe.next = d;

console.log('abcd: ', JSON.stringify(removeDups(a)));