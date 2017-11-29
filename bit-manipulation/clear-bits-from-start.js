/* From least significant bit to index (exclusive), flip 1s to 0s.
 *
 * Main idea:  * AND with 1s leaves bits as is, while AND with 0s clears the
 * bits. -1 is a series of 1s in binary, so left shift 1s to the point where
 * you want to keep values (that is, at the given index).
 *
 * EXAMPLE MASK CALCULATIONS:
 * -1 << 2 => 1111 << 2 => 1100
 * Notice that least significant bits below index are 0s and at/after are 1s.
 *
 * Strategy: To clear all bits from the least significant bit to the index
 * (exclusive), create a mask with a sequence of 1s. Then shift it left by the
 * index. AND operation clears bits below index.
 */
function clearBitsFromStart(binary, index) {
  const mask = (-1 << index);
  return binary & mask;
}

const bin = (10).toString(2);
console.log(bin); // 1010
console.log(10, clearBitsFromStart(10, 0));
console.log(10, clearBitsFromStart(10, 1));
console.log(8, clearBitsFromStart(10, 2));
console.log(8, clearBitsFromStart(10, 3));
console.log(0, clearBitsFromStart(10, 4));