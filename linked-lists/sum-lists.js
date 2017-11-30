/* You have two numbers represented by a linked list, where each node contains a
 * single digit. The digits are stored in reverse order, such that the 1's digit
 * is at the head of the list. Write a function that adds the two numbers and 
 * returns the sum as a linked list.
 * 
 * EXAMPLE
 * Input: (7 -> 1 -> 6) + (5 -> 9 -> 2). That is, 617 + 295.
 * Output: 2 -> 1 -> 9. That is, 912.
 * 
 * FOLLOW UP
 * Suppose the digits are stored in forward order. Repeat the above problem.
 * 
 * EXAMPLE
 * Input: (6 -> 1 -> 7) + (2 -> 9 -> 5). That is, 617 + 295.
 * Output: 9 -> 1 -> 2. That is, 912.
 * 
 * STRATEGY FOR REVERSE
 * Prepend each number as string for each list. Then convert to numbers and add.
 * Build list based on result.
 * 
 * STRATEGY FOR FORWARD
 * Append each number as string for each list. Then convert to numbers and add.
 * Build list based on result.
 * 
 * Time complexity: O(N)
 * Space complexity: O(N)
 */
