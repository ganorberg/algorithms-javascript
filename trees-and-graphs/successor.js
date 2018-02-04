/* Write an algorithm to find the "next" node (i.e., in-order successor) of a
 * given node in a binary search tree. You may assume that each node has a link
 * to its parent.
 * 
 * ASSUMPTIONS
 * - valid binary search tree input
 * - node input is an object with a value property
 * - BST input is object, as opposed to being stored in root property
 * - BST has no methods to use like getMax or getMin
 * - no dupes in BST
 * - node is actually in BST
 * 
 * STRATEGY: O(N) time and O(logN) space (including call stack)
 * Perform in-order traversal looking for input node. Return next node during 
 * traversal.
 * 
 * STRATEGY: O(logN) time and O(logN) space (including call stack)
 * Search for input node, then follow cases below.
 * 
 * 4 cases:
 * 1. If max, return null because no greater values.
 * 2. If has right subtree, then get min of right subtree.
 * 3. If left child, get parent.
 * 4. If right child, traverse parents until node is left child, then return parent
 */
function successor(BST, node) {
  if (node === getMax(BST)) { return null; }
  if (node.right !== null) { return getMin(node.right); }
  if (node === node.parent.left) { return node.parent; }
  return getParentOfAncestorThatIsLeftChild(node);
}

function isRightChild(node) {
  return node === node.parent.right;
}

function getMin(tree) {
  if (tree.left === null) { return tree; }
  return getMin(tree.left);
}

function getMax(tree) {
  if (tree.right === null) { return tree; }
  return getMax(tree.right);
}

function getParentOfAncestorThatIsLeftChild(node) {
  let currentNode = node;
  while (isRightChild(currentNode)) { currentNode = currentNode.parent; }
  return currentNode.parent;
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

console.assert(node5, successor(BST, BST));
console.assert(node, successor(BST, BST.left));
console.assert(node2, successor(BST, BST.left.left.right));
console.assert(node6, successor(BST, BST.right));
console.log(null, successor(BST, BST.right.right));