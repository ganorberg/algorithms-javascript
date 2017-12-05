/* T1 and T2 are two very large binary trees, with T1 much bigger than T2. 
 * Create an algorithm to determine if T2 is a subtree of T1.
 * 
 * A tree T2 is a subtree of T1 if there exists a node n in T1 such that the 
 * subtree of n is identical to T2. That is, if you cut off the tree at node n, 
 * the two trees would be identical.
 * 
 * ASSUMPTIONS
 * - valid input 
 * - null is not considered a subtree. Otherwise, add edge case.
 * - not necessarily binary search trees
 * - no metadata like height or size
 * - its probably asking for deep equality rather than referential equality
 * - each input is root object, rather than having root property to access tree
 * - values are primitives rather than objects with different references
 * - "includes" method operates in linear time. Not sure which algorithm is used
 *   by native JS, but I imagine something like KMP with O(M) preprocessing 
 *   space then O(N) time
 * 
 * STRATEGY WITH NODE AND ACCESS TO PARENTS: O(logN) time and space
 * Move from T2 up to root. If T1 shares same root, then T2 is subtree.
 * 
 * STRATEGY WITH NODE AND WITHOUT ACCESS TO PARENTS: O(N) time and O(logN) space
 * DFS or BFS until node matches T2.
 * 
 * STRATEGY WITHOUT NODE AND WITH EXTRA STRUCTURES: O(N + M) time and O(N + M) space
 * Traverse T1 until find value matching T2. Now pre-order traverse both 
 * and store in array for comparison. To handle possible duplicates that could
 * lead to identical pre-order traversal values with different structures, 
 * include null leaves in array. This also handles cases where two different
 * structures with unique values, like "3 left 4" vs "3 right 4", have the same
 * pre-order traversal. Deep equality on both arrays means T2 is subtree.
 * 
 * STRATEGY WITHOUT NODE AND NO EXTRA STRUCTURES: 
 * O(NM) time if all T1 values match T2 root. Better bound is O(N + KM) time 
 * where K is the number of root matches. Average much faster since we exit 
 * early when matching trees, theta(N). O(logN + logM) space.
 * 
 * Traverse T1 until find value matching T2. Now pre-order traverse both 
 * simultaneously, and if every value matches, then T2 is subtree. Because of
 * possible duplicates, directions will need to be compared during recursion and
 * all nodes in T1 will need to be checked for possible subtree.
 */
function checkSubtree(T1, T2) {
  if (T1 === null) { return false; }
  if (T1.value === T2.value && matchSubtrees(T1, T2)) { return true; }
  return checkSubtree(T1.left, T2) || checkSubtree(T1.right, T2);
}

function matchSubtrees(T1, T2) {
  if (T1 === null && T2 === null) { return true; }
  if (T1 === null || T2 === null) { return false; }
  if (T1.value !== T2.value) { return false; }
  return matchSubtrees(T1.left, T2.left) && matchSubtrees(T1.right, T2.right);
}

const BST1 = { "value": 3, "left": { "value": 1, "left": { "value": 0, "left": null, "right": null }, "right": { "value": 2, "left": null, "right": null } }, "right": { "value": 5, "left": { "value": 4, "left": null, "right": null }, "right": { "value": 6, "left": null, "right": { "value": 7, "left": null, "right": null } } } };

const BST2 = {
  "value": 5,
  "left": {
    "value": 4,
    "left": null,
    "right": null
  },
  "right": {
    "value": 6,
    "left": null,
    "right": {
      "value": 7,
      "left": null,
      "right": null
    }
  }
};

const BST3 = { value: 7, left: null, right: null };
const BST4 = { value: 7, left: { value: 10, left: null, right: { value: 18, left: null, right: null } }, right: null };

console.log(true, checkSubtree(BST1, BST2));
console.log(true, checkSubtree(BST1, BST3));
console.log(false, checkSubtree(BST1, BST4));





// STRATEGY WITHOUT NODE AND WITH EXTRA STRUCTURES
// function checkSubtree(T1, T2) {
//   const T1Visits = preOrderTraverse(T1).join('');
//   const T2Visits = preOrderTraverse(T2).join('');
//   return T1Visits.includes(T2Visits);
// }

// function preOrderTraverse(tree, visited = []) {
//   if (tree === null) {
//     visited.push(null);
//     return;
//   }

//   visited.push(tree.value);
//   preOrderTraverse(tree.left, visited);
//   preOrderTraverse(tree.right, visited);
//   return visited;
// }