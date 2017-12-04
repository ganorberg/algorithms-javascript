/* Find the first common ancestor of two nodes in a binary tree. Avoid storing 
 * additional nodes in a data structure. NOTE: This is not necessarily a binary 
 * search tree.
 * 
 * ASSUMPTIONS
 * - both nodes exist in tree. Otherwise, start with check.
 * - if node is its own ancestor, such as between parent and child, return self
 * 
 * STRATEGY WITH LINK TO PARENTS: O(N) time and O(logN) space for call stack
 * Pick either node. Recursively search parent's other subtree for other node.
 * 
 * STRATEGY WITHOUT LINK TO PARENTS: BRUTE FORCE
 * Starting at root, search both subtrees for an input node. If at least one is
 * false, recurse with children. Return node when both subtrees return true.
 * 
 * BETTER STRATEGY WITHOUT LINK TO PARENTS: O(N) time and O(logN) space
 * Repeat brute force above, but only check side where both children found.
 * 
 * OPTIMIZED STRATEGY WITHOUT LINK TO PARENTS: reduce time by constant factor
 * Repeat above strategy, but "bubble up" branches where nodes are found. When
 * a node sees both nodes have bubbled up, return that node.
 */

// WITHOUT LINK TO PARENTS, OPTIMIZED
function firstCommonAncestor(currentNode, descendant1, descendant2) {
  /* 
    Success case: return immediately if root, otherwise bubble it up!
    Note this handles an ancestor being a direct parent, as the parent is
    returned without needing to see child. We know this node will be the common
    ancestor if the other branches above it all return undefined -- handled 
    below in case reduction.
  */
  if (currentNode === descendant1) { return descendant1; }
  if (currentNode === descendant2) { return descendant2; }

  // Failure case: nothing in this branch
  if (currentNode === null) { return; }

  // Traverse all nodes
  const foundInLeftSubtree = firstCommonAncestor(currentNode.left, descendant1, descendant2);
  const foundInRightSubtree = firstCommonAncestor(currentNode.right, descendant1, descendant2);

  // Implicit type conversion allows nodes to cleanly be used as booleans
  if (foundInLeftSubtree && foundInRightSubtree) { return currentNode; }
  if (foundInLeftSubtree) { return foundInLeftSubtree; }
  if (foundInRightSubtree) { return foundInRightSubtree; }
}

class Node {
  constructor(value, parent) {
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}

const node = new Node(10, null);
const node2 = new Node(8, node);
const node3 = new Node(6, node2);
const node4 = new Node(7, node3);
const node5 = new Node(15, node);
const node6 = new Node(20, node5);

const BST = node;
BST.left = node2;
BST.left.left = node3;
BST.left.left.right = node4;
BST.right = node5;
BST.right.right = node6;

// console.log(BST);
console.log(10, firstCommonAncestor(BST, node2, node5));
console.log(6, firstCommonAncestor(BST, node3, node4));
console.log(10, firstCommonAncestor(BST, node6, node4));

// WITH ACCESS TO PARENTS
// function firstCommonAncestor(startNode, endNode) {
//   // Assumes both nodes in tree
//   if (isRoot(startNode)) { return startNode; }

//   // Ancestor is parent
//   if (startNode.parent === endNode) { return endNode; }
//   if (isLeftChild(startNode) && foundInSubtree(startNode.parent.right, endNode)) {
//     return startNode.parent;
//   }
//   if (!isLeftChild(startNode) && foundInSubtree(startNode.parent.left, endNode)) {
//     return startNode.parent;
//   }

//   // Nothing found, keep searching and move to parent
//   return firstCommonAncestor(startNode.parent, endNode);
// }

// function isRoot(node) {
//   return node.parent === null;
// }

// function isLeftChild(node) {
//   return node === node.parent.left;
// }

// function foundInSubtree(startNode, endNode) {
//   if (startNode === null) { return false; }
//   if (startNode === endNode) { return true; }
//   return foundInSubtree(startNode.left, endNode)
//     || foundInSubtree(startNode.right, endNode);
// }

