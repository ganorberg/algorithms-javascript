/* At index, update bit to value provided
 *
 * Main idea: Clear bit, then OR with value at given index
 *
 * EXAMPLE:
 * binary = 1010
 * index = 2
 * value = 1
 * clearMask = 1011
 * 1010 & 1011 = 1010
 * updateMask = 0100
 * 1010 | 0100 = 1110 = 14
 *
 * Strategy: Clear the bit at the index by using a mask that looks like
 * 11101111 for index = 4. Then, shift the intended value left by the index.
 * This will create a number with the bit at the index equal to the value, while
 * all other bits equal 0. Finally, OR these two numbers to update the
 * bit at the index if the value is 1, or leave 0 as is.
 */
function updateBit(binary, index, value) {
  const clearMask = ~(1 << index);
  const updateMask = value << index;
  return (binary & clearMask) | updateMask;
}

const bin = (10).toString(2);
console.log(bin); // 1010
console.log(11, updateBit(10, 0, 1));
console.log(8, updateBit(10, 1, 0));
console.log(14, updateBit(10, 2, 1));
console.log(10, updateBit(10, 2, 0));
console.log(10, updateBit(10, 3, 1));