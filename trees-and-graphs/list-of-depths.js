/* Given a binary tree, design an algorithm which creates a linked list of all 
 * the nodes at each depth (e.g., if you have a tree with depth D, you'll have 
 * D linked lists).
 * 
 * ASSUMPTIONS
 * - valid input
 * - BST is root object, as opposed to having root property to access BST.root
 * - keep children pointers instead of mutating them to null
 * - return array of lists
 */
function convertLevelsToLists(BST) {
  if (BST === null) { return []; }

  const linkedLists = [];

  let q = [];
  let level = [BST];

  while (level.length > 0) {
    const list = buildLinkedList(level);
    linkedLists.push(list);

    q = level;
    level = [];

    q.forEach(node => {
      if (node.left !== null) { level.push(node.left); }
      if (node.right !== null) { level.push(node.right); }
    });
  }

  return linkedLists;
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function buildLinkedList(array) {
  const list = new Node(array[0]);
  let curr = list;

  for (let i = 1; i < array.length; i++ , curr = curr.next) {
    curr.next = new Node(array[i]);
  }

  return list;
}

// BFS
// build LL of each temp queue
const BST = { "value": 3, "left": { "value": 1, "left": { "value": 0, "left": null, "right": null }, "right": { "value": 2, "left": null, "right": null } }, "right": { "value": 5, "left": { "value": 4, "left": null, "right": null }, "right": { "value": 6, "left": null, "right": { "value": 7, "left": null, "right": null } } } };

console.log(JSON.stringify(convertLevelsToLists(BST)));
// console.log(buildLinkedList([0, 1, 2]));