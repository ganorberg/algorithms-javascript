/* Given a sorted (increasing order) array with unique integer elements, write 
 * an algorithm to create a binary search tree with minimal height.
 * 
 * ASSUMPTIONS
 * - valid input
 * 
 * O(N) time and space complexity
 */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function buildBST(array, start = 0, end = array.length - 1) {
  if (end < start) { return null; }

  const middle = Math.floor((start + end) / 2);
  const tree = new Node(array[middle]);

  tree.left = buildBST(array, start, middle - 1);
  tree.right = buildBST(array, middle + 1, end);

  return tree;
}

// want middle to be root
// then want to build left subtree and right subtree recursively
// base case when end passes start, meaning null left or right branch
// all calls mutate tree in higher call, and top-level call returns whole tree
const arr = [0, 1, 2, 3, 4, 5, 6];
const arr2 = [0, 1, 2, 3, 4, 5, 6, 7];
console.log(buildBST(arr));
console.log(JSON.stringify(buildBST(arr2)));