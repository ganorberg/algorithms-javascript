/* Implement a function to check if a linked list is a palindrome.
 *
 * ASSUMPTIONS
 * - singly linked list
 * - valid inputs
 * 
 * STRATEGY
 * Convert to string. Then move pointers from each end comparing values.
 * 
 * STRATEGY 2
 * Convert to string. Then convert to array, run reverse method, join to string,
 * and do equality comparison with original string.
 * 
 * STRATEGY 3
 * Get length of list. Then push values to stack until halfway point. If even,
 * start popping and comparing at halfway point. If odd, skip middle node then
 * pop and compare.
 */