/* Implement a function to check if a binary tree is balanced. For the purposes 
 * of this question, a balanced tree is defined to be a tree such that the 
 * heights of the two subtrees of any node never differ by more than one.
 * 
 * ASSUMPTIONS
 * - valid inputs
 */
function isBalanced(tree) {
  return dfsHeight(tree) !== "not balanced";
}

// O(N) time complexity and O(height) space including call stack
function dfsHeight(tree) {
  if (tree === null) { return 0; }

  const leftHeight = dfsHeight(tree.left);
  if (leftHeight === "not balanced") { return "not balanced"; }
  const rightHeight = dfsHeight(tree.right);
  if (rightHeight === "not balanced") { return "not balanced"; }

  if (Math.abs(leftHeight - rightHeight) > 1) { return "not balanced"; }
  return 1 + Math.max(leftHeight, rightHeight);
}

const BST = { "value": 3, "left": { "value": 1, "left": { "value": 0, "left": null, "right": null }, "right": { "value": 2, "left": null, "right": null } }, "right": { "value": 5, "left": { "value": 4, "left": null, "right": null }, "right": { "value": 6, "left": null, "right": { "value": 7, "left": null, "right": null } } } };

const badBST = {
  value: 10,
  left: null,
  right: {
    value: 15,
    left: null,
    right: {
      value: 20,
      left: null,
      right: null
    }
  }
}

console.log(true, isBalanced(BST));
console.log(false, isBalanced(badBST));


// O(NlogN) time complexity
// function isHeightBalanced(tree) {
//   if (tree === null) { return true; }

//   const leftDepth = countDepth(tree.left);
//   const rightDepth = countDepth(tree.right);

//   if (Math.abs(leftDepth - rightDepth) > 1) { return false; }

//   return isHeightBalanced(tree.left) && isHeightBalanced(tree.right);
// }

// function countDepth(node, count = 1) {
//   if (node === null) { return count - 1; }

//   const leftCount = countDepth(node.left, count + 1);
//   const rightCount = countDepth(node.right, count + 1);

//   return Math.max(leftCount, rightCount);
// }

// console.log(isHeightBalanced(BST));
// console.log(isHeightBalanced(badBST));
