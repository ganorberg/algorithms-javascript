/* Implement a function to check if a binary tree is a binary search tree.
 * 
 * ASSUMPTIONS
 * - valid binary tree input
 * - node has properties: number value and left/right with null pointers if no children
 */
function isValidBST(tree, min = -Infinity, max = Infinity) {
  if (tree === null) { return true; }
  if (tree.value <= min || tree.value >= max) { return false; }
  return isValidBST(tree.left, min, tree.value) && isValidBST(tree.right, tree.value, max);
}

const BST = { "value": 3, "left": { "value": 1, "left": { "value": 0, "left": null, "right": null }, "right": { "value": 2, "left": null, "right": null } }, "right": { "value": 5, "left": { "value": 4, "left": null, "right": null }, "right": { "value": 6, "left": null, "right": { "value": 7, "left": null, "right": null } } } };

const badTree = {
  value: 10,
  left: null,
  right: {
    value: 9,
    left: null,
    right: {
      value: 20,
      left: null,
      right: null
    }
  }
}

const badTree2 = {
  value: 10,
  left: {
    value: 5,
    left: null,
    right: null
  },
  right: {
    value: 9,
    left: null,
    right: {
      value: 20,
      left: null,
      right: null
    }
  }
}

console.log(true, isValidBST(BST));
console.log(false, isValidBST(badTree));
console.log(false, isValidBST(badTree2));