/*
 * You have an integer and you can flip exactly one bit from a 0 to a 1. Write
 * code to find the length of the longest sequence of 1s you could create.
 * 
 * EXAMPLE
 * Input: 1775 (or: 11011101111)
 * Output: 8
 * 
 * STRATEGY
 * Loop binary value to count sequential 1s. Track previous sequence, current
 * sequence, and max length. Previous sequence is 0 unless a sequence of 1s is
 * followed by only one 0. When the next 0 is found, sum current with previous 
 * sequence and compare to max, then set previous to current. If max came from
 * single sequence, add a 1 to it ("flip an adjacent 0") unless all bits were 1.
 * Return max length.
 */