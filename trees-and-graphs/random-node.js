/* You are implementing a binary tree class from scratch which, in addition to 
 * insert, find, and delete, has a method getRandomNode() which returns a random
 * node from the tree. All nodes should be equally likely to be chosen. Design 
 * and implement an algorithm for getRandomNode, and explain how you would 
 * implement the rest of the methods.
 * 
 * ASSUMPTIONS
 * - valid binary tree input, non-null
 * - not supposed to build binary search tree because it was not specified
 *   (although this is the more interesting case, see below)
 * 
 * STRATEGIES:
 * (can optimize find and delete times using Set or Hash Table in class)
 * 
 * INSERT: O(1) time and space
 * Build array where first value is null, root is at index 1, and all children 
 * are at 2N and 2N + 1 from parent.
 * 
 * FIND: O(N) time and O(1) space
 * Loop through array looking for value.
 * 
 * DELETE: O(N) time and O(1) space
 * Find value, swap with last value, then pop array.
 * 
 * GETRANDOMNODE: O(1) time and space
 * Call floor on math.random between 0 and array length, then access array at
 * that index.
 * 
 * 
 * BINARY SEARCH TREE STRATEGIES:
 * Note: O(logN) times assume tree is balanced. For non-balanced trees, the 
 * time is O(d), where d is max depth.
 * 
 * INSERT: O(logN) time and O(logN) space. Increment size of subtrees.
 * FIND: O(logN) time and O(logN) space
 * DELETE: O(logN) time and O(logN) space. Decrement size of subtrees.
 * GETRANDOMNODE: O(1) time and space with extra structures, else O(logN) time
 *  - Store size of tree then get random number between 0 and size. Do in-order 
 *    traversal of tree and stop on random number.
 *      - can optimize this by having each node store size of subtrees then 
 *        moving toward value. For example, with 9 nodes in tree and the number
 *        7 randomly picked, if we know 4 values exist in left subtree, then we
 *        can move to the right.
 *  - Array can pick a random node instantly. Simply add on insert and remove on 
 *    delete. Use Hash Table to keep track of values to index in array.
 */
