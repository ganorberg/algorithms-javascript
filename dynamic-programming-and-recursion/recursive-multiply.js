/*
 * Write a recursive function to multiply two positive integers without using 
 * the * operator. You can use addition, subtraction, and bit shifting, but you 
 * should minimize the number of those operations.
 * 
 * ASSUMPTIONS
 * - valid inputs
 * - bit shifting means answer likely has to do with powers of 2
 * - optimal substructure, such that finding minimum of 2 x 3 gives meaningful
 *   information to parent calls. For example, doubling will add 1 operation to
 *   the min, and that will be the true minimum for that operation, in this case
 *   4 x 3 or 2 x 6.
 * 
 * STRATEGY O(log s), where s is smaller number
 * - Given numbers s and b, multiplication can be thought of as an s x b grid of
 *   cells. For an even output, we can cut the grid in half until we reach a 
 *   base case of b. For odd output, we have 2 options. We can split the call,
 *   so 5 x 9 would become 2 x 9 and 3 x 9, and recurse even or odd as 
 *   appropriate. However, a faster a option is to recognize that 5 * 9 is the
 *   same as 4 * 9 + 9. So we use addition to cut the number of operations. This
 *   also avoids having to cache calls that might overlap, since with the latter
 *   strategy the smaller value simply gets cut in half repeatedly until base 
 *   case, giving a logarithmic time complexity.
 * 
 * STRATEGY: O(s), where s is smaller number
 * - Add one number the "other number" of times. To minimize operations, the 
 *   "other number" should be the smaller value.
 */
function recursiveMultiply(n1, n2) {
  const smaller = Math.min(n1, n2);
  const bigger = Math.max(n1, n2);

  return getProduct(smaller, bigger);
}

function getProduct(smaller, bigger) {
  if (smaller === 0) { return 0; }
  if (smaller === 1) { return bigger; }
  if (isEven(smaller)) {
    const CUT_IN_HALF = smaller >> 1;
    const product = getProduct(CUT_IN_HALF, bigger);
    return product + product;
  }

  // 5 * 9 = 4 * 9 + 9
  const SMALLER_REDUCED_BY_1 = smaller - 1;
  return getProduct(SMALLER_REDUCED_BY_1, bigger) + bigger;
}

function isEven(num) {
  return num % 2 === 0;
}

console.log(6, recursiveMultiply(2, 3));
console.log(12, recursiveMultiply(4, 3));
console.log(24, recursiveMultiply(8, 3));
console.log(48, recursiveMultiply(8, 6));
console.log(63, recursiveMultiply(7, 9));