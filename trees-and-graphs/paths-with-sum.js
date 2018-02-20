/* 
 * You are given a binary tree in which each node contains an integer value 
 * (which might be positive or negative). Design an algorithm to count the 
 * number of paths that sum to a given value. The path does not need to start or
 * end at the root or a leaf, but it must go downwards (traveling only from 
 * parent nodes to child nodes).
 * 
 * ASSUMPTIONS
 * - valid input, non-null, not necessarily binary search tree
 * - nodes have value, left and right properties
 * - children do not have access to parents
 * - might be no possible paths
 * - tree might have duplicates or zeros
 * 
 * STRATEGY: O(N) time and O(logN) space for balanced tree, or O(N) if not balanced
 * DFS through tree. Use hash map to track possible sums at each level. Return
 * path counts, where count is incremented in 2 cases:
 * 
 * 1. The sum of all values along this branch from the root equals the target
 *    sum.
 * 2. More likely, the sum of a contiguous subset of nodes in the current branch
 *    equals the target sum. Given the sum from root, which we track the whole
 *    way down the branch, we can subtract the target sum to get the leftover 
 *    value of that path BEFORE the contiguous subset. If that value exists in
 *    the hash table, as it would if we have been storing our sum from the root
 *    all the way down, then that means the path MUST have a valid sum -- 
 *    specifically, it's the sum of node values between the current node and the
 *    node with the sum we checked exists in the hash table.
 */
function countPathsWithSum(node, targetSum, runningSum = 0, pathCount = {}) {
  if (node === null) { return 0; }

  // Each node will store its sum in hash table as path memory
  const sumFromRoot = runningSum + node.value;

  // Hash table allows us to check for sum in constant time at each node
  pathCount.hasOwnProperty(sumFromRoot)
    ? pathCount[sumFromRoot]++
    : pathCount[sumFromRoot] = 1;

  let totalPaths = 0;
  if (sumFromRoot === targetSum) { totalPaths++; }

  // Use path memory and two-sum idea to see if target sum exists on this path
  if (pathCount.hasOwnProperty(sumFromRoot - targetSum)) { totalPaths++; }

  // Collect path information from children
  totalPaths += countPathsWithSum(node.left, targetSum, sumFromRoot, pathCount);
  totalPaths += countPathsWithSum(node.right, targetSum, sumFromRoot, pathCount);

  // Backtrack. Do not carry hash table information upstream.
  pathCount[sumFromRoot]--;
  if (pathCount[sumFromRoot] === 0) { delete pathCount[sumFromRoot]; }

  return totalPaths;
}


// TESTING
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const node = new Node(10);
const node2 = new Node(8);
const node3 = new Node(7);
const node4 = new Node(6);
const node5 = new Node(15);
const node6 = new Node(20);
const node7 = new Node(2);
const node8 = new Node(-19);

const BST = node;
BST.left = node2;
BST.left.left = node3;
BST.left.left.left = node4;
BST.right = node5;
BST.right.right = node6;
BST.left.left.left.left = node7;
BST.left.left.left.left.left = node8;

console.log(0, countPathsWithSum(BST, 30));
console.log(2, countPathsWithSum(BST, 8));
console.log(1, countPathsWithSum(BST, -19));
console.log(1, countPathsWithSum(BST, -17));
console.log(3, countPathsWithSum(BST, 15));



/*
 * FUNCTIONAL STRATEGY: O(N^2) time and space
 * Store all sums and counts below all nodes in a bottom-up fashion. For 
 * example, a parent node will contain the most recent sums of its children and
 * their counts. By checking if the parent's value or any of its new sums match
 * the count, the total count can be updated. Root will have the total count
 * representing number of paths.
 */
// function countPathsWithSum(tree, sum) {
//   const allSums = sumTree(tree, sum);
//   return allSums.count;
// }

// function sumTree(node, sum) {
//   if (node === null) { return { count: 0, sums: [] }; }

//   const leftSums = sumTree(node.left, sum);
//   const rightSums = sumTree(node.right, sum);

//   const addToLeft = leftSums.sums.map(sum => sum + node.value);
//   const addToRight = rightSums.sums.map(sum => sum + node.value);

//   const leftCount = addToLeft.filter(value => value === sum).length;
//   const rightCount = addToRight.filter(value => value === sum).length;
//   const selfCount = node.value === sum ? 1 : 0;

//   return {
//     count: leftCount + rightCount + selfCount + leftSums.count + rightSums.count,
//     sums: [node.value, ...addToLeft, ...addToRight],
//   }
// }
