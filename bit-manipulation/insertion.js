/* Splice binary M into N between given indices
 *
 * Strategy: You are given two 32-bit numbers, N and M, and two bit positions,
 * i and j. Write a method to insert M into N such that M starts at bit j and
 * ends at bit i. You can assume that the bits j through i have enough space to
 * fit all of M. This is, if M = 10011, you can assume that there are at least
 * 5 bits between j and i. You would not, for example, have j = 3 and i = 2,
 * because M could not fully fit between bit 3 and bit 2.
 *
 * EXAMPLE
 * Input:  N = 10000000000, M = 10011, i = 2, j = 6
 * Output: N = 10001001100
 */
function insertBinary(N, M, i, j) {
  // Create a mask of 1s, then 0s between indices, then 1s
  const left = -1 << (j + 1);
  const right = (1 << i) - 1;
  const mask = left | right;

  // Clear bits between indices using mask
  const cleared = N & mask;

  // Shift M into position to be inserted
  const inserted = M << i;

  // Merge the two
  return cleared | inserted;
}

console.log(1100, insertBinary(2 ** 10, 19, 2, 6));
console.log(31, insertBinary(17, 7, 1, 3)); // 31 = 1110 | 10001 = 11111