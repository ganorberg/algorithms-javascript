/* A binary search tree was created by traversing through an array from left to 
 * right and inserting each element. Given a binary search tree with distinct 
 * elements, print all possible arrays that could have led to this tree.
 * 
 * EXAMPLE
 * Input:     2
 *          /  \
 *         1   3
 * Output: [[2, 1, 3], [2, 3, 1]]
 * 
 * ASSUMPTIONS
 * - nodes do not have access to parents
 * - nodes have value, left and right properties
 * - no duplicates -- otherwise filter out permutations that are the same
 * 
 * STRATEGY
 * 1. Traverse postorder so that children are touched before parent
 * 2. Compute children's permutations bottom-up
 * 3. Prepend self to each permutation
 * 4. Return array to higher call
 */
function bstSequences(tree) {
  // Subarray required because combineSubtrees acts on nested arrays
  if (tree === null) { return [[]]; }

  const leftSubtreePermutations = bstSequences(tree.left);
  const rightSubtreePermutations = bstSequences(tree.right);

  const childPerms = combineSubtrees(leftSubtreePermutations, rightSubtreePermutations);
  const permsWithParent = childPerms.map(perm => [tree.value, ...perm]);
  return permsWithParent;
}

function combineSubtrees(left = [[]], right = [[]]) {
  const results = [];

  left.forEach(leftPerm => {
    right.forEach(rightPerm => {
      // SIDE EFFECT: pushes permutation arrays to results
      relativeOrderPermutations(leftPerm, rightPerm, results);
    });
  });

  return results;
}

// Replace arrays with linked lists for more performant shift/unshift operations
function relativeOrderPermutations(first = [], second = [], results = [], permutation = []) {
  // If one array is empty, we know we can simply append other array to our permutation
  if (first.length === 0 || second.length === 0) {
    results.push([...permutation, ...first, ...second]);
    return;
  }

  // Each of these blocks gives items a chance at being next, followed by backtrack
  const headFirst = first.shift();
  permutation.push(headFirst);
  relativeOrderPermutations(first, second, results, permutation);
  permutation.pop();
  first.unshift(headFirst);

  const headSecond = second.shift();
  permutation.push(headSecond);
  relativeOrderPermutations(first, second, results, permutation);
  permutation.pop();
  second.unshift(headSecond);
}

// TESTING BELOW
function testAllUnique(perms) {
  const set = new Set();
  for (let i = 0; i < perms.length; i++) {
    const perm = JSON.stringify(perms[i]);

    if (set.has(perm)) { return false; }
    set.add(perm);
  }

  return true;
}
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const node = new Node(10);
const node2 = new Node(8);
const node3 = new Node(6);
const node4 = new Node(7);
const node5 = new Node(15);
const node6 = new Node(20);

const BST = node;
BST.left = node2;
BST.left.left = node3;
BST.left.left.right = node4;
BST.right = node5;
BST.right.right = node6;

const sequences = bstSequences(BST);
console.log(sequences);
console.log(true, testAllUnique(sequences));

// const leftTest = [[1, 2, 3], [7, 8, 9]];
// const rightTest = [[4, 5, 6], [10, 11, 12]];
// const testPerms = combineSubtrees(leftTest, rightTest);
// console.log(testPerms);
// console.log(80, testPerms.length);
// console.log(true, testAllUnique(testPerms));
