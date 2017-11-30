/* Given a circular linked list, implement an algorithm that returns the node at
 * the beginning of the loop.
 * 
 * DEFINITION
 * Circular linked list: A (corrupt) linked list in which a node's next pointer 
 * points to an earlier node, so as to make a loop in the linked list.
 * 
 * EXAMPLE
 * Input: A -> B -> C -> D -> E -> C loop
 * Output: C
 * 
 * 
 * RUNNER STRATEGY: O(N) TIME AND O(1) SPACE
 * Move two pointers with one at double speed. If intersect, loop exists.
 * 
 * MUTATION STRATEGY: O(N) TIME AND O(N) SPACE
 * Create flag for every visited node. If see flag, know cycle exists.
 * 
 * SET STRATEGY: O(N) TIME AND O(N) SPACE
 * Push nodes into Set. At each node, check if already exists in Set. If so,
 * cycle exists.
 */