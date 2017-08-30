/* Get bit at the given index in boolean form.
 *
 * Main idea: AND with 0s in mask yields 0 in all values outside of index, and
 * leftover bit can be 1 (giving any power of 2 and making the statement true)
 * or 0 (making the statement false).
 *
 * Strategy: Shift 1 left to the proper index, creating a value that looks like
 * 00010000 for index = 4. By performing an AND with binary, we clear all bits
 * other than the bit at the index. Finally, we compare that to 0. If that new
 * value is not zero, then bit at index must have a 1. Otherwise, the bit is a 0.
 */

function getBit(binary, index) {
  return ((binary & (1 << index)) !== 0);
}

const bin = (10).toString(2);
console.log(bin); // 1010
console.log(false, getBit(10, 0));
console.log(true, getBit(10, 1));
console.log(false, getBit(10, 2));
console.log(true, getBit(10, 3));