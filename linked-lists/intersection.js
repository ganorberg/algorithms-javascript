/* Given two (singly) linked lists, determine if the two lists intersect. Return
 * the intersecting node. Note that the intersection is defined based on 
 * reference, not value. That is, if the kth node of the first linked list is 
 * the exact same node (by reference) as the jth node of the second linked list,
 * then they are intersecting.
 * 
 * EFFICIENT STRATEGY: O(A + B) TIME AND O(1) SPACE
 * If intersect, then both lists share all nodes after intersection. Check if
 * tails match, and if so, get length of shorter list. Check for node equality
 * from every node in longer list starting at "shorter list length" from tail.
 * When all node match from a certain node, that node is the intersection.
 * 
 * BRUTE FORCE STRATEGY: O(N^2) TIME AND O(1) SPACE
 * Traverse one list, pausing on each node. Traverse other list and do equality
 * check on every node.
 * 
 * SET STRATEGY: O(A + B) TIME AND O(longer list) SPACE
 * Use Set to store all nodes from one list. Then while traversing second list, 
 * check if node exists in Set.
 */